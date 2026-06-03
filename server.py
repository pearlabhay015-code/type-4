#!/usr/bin/env python3
import http.server
import socketserver
import sqlite3
import json
import hashlib
import secrets
import os
from datetime import datetime, timedelta
from http.cookies import SimpleCookie
from urllib.parse import urlparse

PORT = 8000
DB_FILE = 'admin.db'

# Database Setup
def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    # Create tables if they do not exist
    c.execute('''
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title_en TEXT NOT NULL,
            title_hi TEXT NOT NULL,
            desc_en TEXT NOT NULL,
            desc_hi TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            action TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Password Security
def hash_password(password, salt=None):
    if not salt:
        salt = secrets.token_hex(16)
    hash_obj = hashlib.sha256((password + salt).encode('utf-8'))
    return hash_obj.hexdigest(), salt

# Database metrics helper
def get_db_stats():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    c.execute('SELECT COUNT(*) FROM announcements')
    announcements_count = c.fetchone()[0]
    
    c.execute('SELECT COUNT(*) FROM sessions')
    active_sessions = c.fetchone()[0]
    
    # Just an arbitrary metric of logged actions
    c.execute('SELECT COUNT(*) FROM audit_logs')
    queries_count = c.fetchone()[0]
    
    conn.close()
    return {
        "announcements_count": announcements_count,
        "active_sessions": active_sessions,
        "queries_count": queries_count
    }

class AdminHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    
    # Helper to parse POST body JSON
    def get_post_data(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            return {}
        post_data = self.rfile.read(content_length)
        try:
            return json.loads(post_data.decode('utf-8'))
        except Exception:
            return {}

    # Helper to write JSON response
    def send_json(self, status, data, headers=None):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        
        if headers:
            for k, v in headers.items():
                self.send_header(k, v)
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    # Retrieve current valid session username from cookie
    def get_session_username(self):
        cookie_header = self.headers.get('Cookie')
        if not cookie_header:
            return None
        
        cookie = SimpleCookie(cookie_header)
        if 'session_token' not in cookie:
            return None
            
        session_token = cookie['session_token'].value
        
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('SELECT username, expires_at FROM sessions WHERE token = ?', (session_token,))
        row = c.fetchone()
        conn.close()
        
        if not row:
            return None
            
        username, expires_at_str = row
        try:
            expires_at = datetime.fromisoformat(expires_at_str)
            if datetime.now() > expires_at:
                # Clean expired session from DB
                conn = sqlite3.connect(DB_FILE)
                c = conn.cursor()
                c.execute('DELETE FROM sessions WHERE token = ?', (session_token,))
                conn.commit()
                conn.close()
                return None
            return username
        except Exception:
            return None

    # Serve static and API GET requests
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 1. API: Check setup status
        if path == '/api/setup-status':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT COUNT(*) FROM admin_users')
            users_count = c.fetchone()[0]
            conn.close()
            
            setup_required = (users_count == 0)
            self.send_json(200, { "setup_required": setup_required })
            return
            
        # 2. API: Check active session
        elif path == '/api/check-session':
            username = self.get_session_username()
            if username:
                self.send_json(200, { "authenticated": True, "username": username })
            else:
                self.send_json(200, { "authenticated": False })
            return
            
        # 3. API: Load dashboard stats (Protected)
        elif path == '/api/admin/stats':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            stats = get_db_stats()
            self.send_json(200, stats)
            return

        # 4. API: Load audit logs (Protected)
        elif path == '/api/admin/logs':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT username, action, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 50')
            rows = c.fetchall()
            conn.close()
            
            logs = [{"username": r[0], "action": r[1], "created_at": r[2]} for r in rows]
            self.send_json(200, logs)
            return

        # Fallback: Serve static HTML files from current directory
        super().do_GET()

    # Serve API POST requests
    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 1. API: Register first-time admin
        if path == '/api/register':
            # Verify that setup is actually required (no user must exist)
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT COUNT(*) FROM admin_users')
            users_count = c.fetchone()[0]
            
            if users_count > 0:
                conn.close()
                self.send_json(403, { "error": "Configuration already complete. Administrator exists." })
                return
                
            data = self.get_post_data()
            username = data.get('username', '').strip()
            password = data.get('password', '')
            
            if not username or len(password) < 8:
                conn.close()
                self.send_json(400, { "error": "Invalid username or password (min 8 characters)." })
                return
                
            # Hash and save admin user
            pwd_hash, salt = hash_password(password)
            try:
                c.execute('INSERT INTO admin_users (username, password_hash, salt) VALUES (?, ?, ?)', 
                          (username, pwd_hash, salt))
                # Log action
                c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                          (username, "Initial Admin Setup Completed"))
                conn.commit()
            except sqlite3.IntegrityError:
                conn.close()
                self.send_json(409, { "error": "Username already exists." })
                return
            
            # Start session immediately
            session_token = secrets.token_hex(32)
            expires_at = (datetime.now() + timedelta(hours=1)).isoformat()
            c.execute('INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)', 
                      (session_token, username, expires_at))
            conn.commit()
            conn.close()
            
            # Set cookie header
            cookie = SimpleCookie()
            cookie['session_token'] = session_token
            cookie['session_token']['path'] = '/'
            cookie['session_token']['httponly'] = True
            cookie['session_token']['max-age'] = 3600
            
            self.send_json(200, { "success": True }, { "Set-Cookie": cookie.output(header='') })
            return

        # 2. API: Sign In Admin
        elif path == '/api/login':
            data = self.get_post_data()
            username = data.get('username', '').strip()
            password = data.get('password', '')
            
            if not username or not password:
                self.send_json(400, { "error": "Username and password required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT password_hash, salt FROM admin_users WHERE username = ?', (username,))
            row = c.fetchone()
            
            if not row:
                # Log failed attempt
                c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                          (username, "Failed login attempt (user not found)"))
                conn.commit()
                conn.close()
                self.send_json(401, { "error": "Invalid username or password." })
                return
                
            db_hash, salt = row
            check_hash, _ = hash_password(password, salt)
            
            if check_hash != db_hash:
                # Log failed attempt
                c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                          (username, "Failed login attempt (incorrect password)"))
                conn.commit()
                conn.close()
                self.send_json(401, { "error": "Invalid username or password." })
                return
                
            # Correct password: create session token
            session_token = secrets.token_hex(32)
            expires_at = (datetime.now() + timedelta(hours=1)).isoformat()
            c.execute('INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)', 
                      (session_token, username, expires_at))
            # Log action
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, "Sign In Successful"))
            conn.commit()
            conn.close()
            
            cookie = SimpleCookie()
            cookie['session_token'] = session_token
            cookie['session_token']['path'] = '/'
            cookie['session_token']['httponly'] = True
            cookie['session_token']['max-age'] = 3600
            
            self.send_json(200, { "success": True }, { "Set-Cookie": cookie.output(header='') })
            return

        # 3. API: Logout Admin
        elif path == '/api/logout':
            cookie_header = self.headers.get('Cookie')
            if cookie_header:
                cookie = SimpleCookie(cookie_header)
                if 'session_token' in cookie:
                    session_token = cookie['session_token'].value
                    conn = sqlite3.connect(DB_FILE)
                    c = conn.cursor()
                    
                    # Fetch username for audit log before delete
                    c.execute('SELECT username FROM sessions WHERE token = ?', (session_token,))
                    row = c.fetchone()
                    if row:
                        c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                                  (row[0], "Sign Out Completed"))
                    
                    c.execute('DELETE FROM sessions WHERE token = ?', (session_token,))
                    conn.commit()
                    conn.close()
                    
            # Clear cookie header
            cookie = SimpleCookie()
            cookie['session_token'] = ''
            cookie['session_token']['path'] = '/'
            cookie['session_token']['httponly'] = True
            cookie['session_token']['expires'] = 'Thu, 01 Jan 1970 00:00:00 GMT'
            
            self.send_json(200, { "success": True }, { "Set-Cookie": cookie.output(header='') })
            return

        # 4. API: Create Announcement (Protected)
        elif path == '/api/announcements':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
                
            data = self.get_post_data()
            title_en = data.get('titleEn', '').strip()
            title_hi = data.get('titleHi', '').strip()
            desc_en = data.get('descEn', '').strip()
            desc_hi = data.get('descHi', '').strip()
            
            if not title_en or not title_hi or not desc_en or not desc_hi:
                self.send_json(400, { "error": "All announcement fields are required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('INSERT INTO announcements (title_en, title_hi, desc_en, desc_hi) VALUES (?, ?, ?, ?)',
                      (title_en, title_hi, desc_en, desc_hi))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Published Announcement: {title_en[:30]}..."))
            conn.commit()
            conn.close()
            
            self.send_json(200, { "success": True })
            return

        else:
            self.send_json(404, { "error": "API Route Not Found" })
            return

# Server main launch method
def run():
    init_db()
    
    # Set current directory to serve static file requests from this path
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    handler = AdminHTTPRequestHandler
    
    # Allow socket address reuse so restarting server is quick
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"CUSB Admin Server running successfully at http://localhost:{PORT}/")
        print("Press Ctrl+C to terminate.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down CUSB Admin Server.")
            httpd.server_close()

if __name__ == '__main__':
    run()
