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

        # 5. API: Search Website
        elif path == '/api/search':
            from urllib.parse import parse_qs
            query_params = parse_qs(parsed_path.query)
            q = query_params.get('q', [''])[0].strip().lower()
            
            if not q:
                self.send_json(200, [])
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''
                SELECT title, tags, desc, url 
                FROM search_index 
                WHERE title LIKE ? OR tags LIKE ? OR desc LIKE ?
                LIMIT 20
            ''', (f'%{q}%', f'%{q}%', f'%{q}%'))
            rows = c.fetchall()
            conn.close()
            
            results = [{"title": r[0], "tags": r[1], "desc": r[2], "url": r[3]} for r in rows]
            self.send_json(200, results)
            return

        # 6. API: Chatbot assistant response
        elif path == '/api/chat':
            from urllib.parse import parse_qs
            query_params = parse_qs(parsed_path.query)
            q = query_params.get('q', [''])[0].strip().lower()
            
            if not q:
                self.send_json(200, {"en": "How can I help you?", "hi": "मैं आपकी क्या मदद कर सकता हूँ?"})
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            
            # Step 1: Check standard FAQ categories
            c.execute('SELECT category, keywords, response_en, response_hi FROM chatbot_faq')
            faq_rows = c.fetchall()
            
            matched_response = None
            for category, keywords, resp_en, resp_hi in faq_rows:
                keywords_list = [k.strip() for k in keywords.split(',') if k.strip()]
                if any(kw in q for kw in keywords_list):
                    matched_response = {"en": resp_en, "hi": resp_hi}
                    break
            
            if matched_response:
                conn.close()
                self.send_json(200, matched_response)
                return
                
            # Step 2: Check for Department query
            c.execute('SELECT slug, name, established, head_of_department, school, summary FROM departments')
            dept_rows = c.fetchall()
            matched_dept = None
            for slug, name, est, hod, school, summary in dept_rows:
                normalized_slug_space = slug.replace('_', ' ').replace('-', ' ')
                if name.lower() in q or normalized_slug_space in q:
                    matched_dept = (slug, name, est, hod, school, summary)
                    break
                    
            if matched_dept:
                slug, name, est, hod, school, summary = matched_dept
                c.execute('SELECT name FROM department_programmes WHERE department_slug = ?', (slug,))
                prog_rows = c.fetchall()
                progs_list = [r[0] for r in prog_rows]
                progs_str = ", ".join(progs_list) if progs_list else "undergraduate/postgraduate courses"
                
                resp_en = f"The Department of {name} is under the {school}. It was established in {est} and is headed by {hod}. Programs: {progs_str}. {summary}"
                resp_hi = f"{name} विभाग {school} के अधीन है। इसकी स्थापना {est} में हुई थी और इसके प्रमुख {hod} हैं। यह विभाग {progs_str} प्रदान करता है।"
                conn.close()
                self.send_json(200, {"en": resp_en, "hi": resp_hi})
                return
                
            # Step 3: Check for Faculty query
            c.execute('SELECT name, designation, specialization, email, department_slug FROM department_faculty')
            fac_rows = c.fetchall()
            matched_fac = None
            for name, designation, spec, email, dept_slug in fac_rows:
                clean_name = name.lower().replace('dr.', '').replace('prof.', '').strip()
                if clean_name in q or name.lower() in q:
                    matched_fac = (name, designation, spec, email, dept_slug)
                    break
                    
            if matched_fac:
                name, designation, spec, email, dept_slug = matched_fac
                c.execute('SELECT name FROM departments WHERE slug = ?', (dept_slug,))
                drow = c.fetchone()
                dname = drow[0] if drow else "Computer Science"
                
                resp_en = f"{name} is a {designation} in the Department of {dname}. Specialization: {spec}. Contact: {email}."
                resp_hi = f"{name}, {dname} विभाग में {designation} हैं। उनका शोध क्षेत्र {spec} है। संपर्क करें: {email}।"
                conn.close()
                self.send_json(200, {"en": resp_en, "hi": resp_hi})
                return
                
            # Step 4: Check for Warden query
            c.execute('SELECT name, role, department, hostel_slug FROM hostel_wardens')
            warden_rows = c.fetchall()
            matched_warden = None
            for name, role, dept, hostel_slug in warden_rows:
                clean_name = name.lower().replace('dr.', '').replace('prof.', '').strip()
                if clean_name in q or name.lower() in q:
                    matched_warden = (name, role, dept, hostel_slug)
                    break
                    
            if matched_warden:
                name, role, dept, hostel_slug = matched_warden
                hname = "Girls Hostels (Gargi/Maitreyi Sadan)" if hostel_slug == 'girls_hostels' else "Boys Hostels (Aryabhatta/Malviya Sadan)"
                resp_en = f"{name} is the {role} of {hname} ({dept})."
                resp_hi = f"{name}, {hname} के {role} हैं और वे {dept} से संबद्ध हैं।"
                conn.close()
                self.send_json(200, {"en": resp_en, "hi": resp_hi})
                return
                
            # Step 5: Check for Hostel query
            c.execute('SELECT name, type, total_rooms, security_details, common_facilities, mess_system, description FROM hostels')
            hostel_rows = c.fetchall()
            matched_hostel = None
            for name, type_, rooms, security, facilities, mess, desc in hostel_rows:
                if name.lower() in q or type_ in q or "hostel" in q or "gargi" in q or "maitreyi" in q or "aryabhatta" in q or "malviya" in q:
                    if "girl" in q and type_ == 'boys':
                        continue
                    if "boy" in q and type_ == 'girls':
                        continue
                    matched_hostel = (name, type_, rooms, security, facilities, mess, desc)
                    break
                    
            if matched_hostel:
                name, type_, rooms, security, facilities, mess, desc = matched_hostel
                resp_en = f"{name} is a {type_} hostel. Capacity: {rooms}. Facilities: {facilities}. Mess: {mess}. Security: {security}."
                resp_hi = f"{name} एक {type_} छात्रावास है। कमरों की क्षमता: {rooms}। सुविधाएं: {facilities}। भोजन व्यवस्था: {mess}।"
                conn.close()
                self.send_json(200, {"en": resp_en, "hi": resp_hi})
                return
                
            # Default Fallback
            c.execute('SELECT response_en, response_hi FROM chatbot_faq WHERE category = "default"')
            default_row = c.fetchone()
            conn.close()
            
            if default_row:
                self.send_json(200, {"en": default_row[0], "hi": default_row[1]})
            else:
                self.send_json(200, {
                    "en": "I can assist you with admissions, course details, campus facilities, hostels, and contacts. What would you like to know?",
                    "hi": "मैं प्रवेश, पाठ्यक्रम विवरण, परिसर सुविधाओं, छात्रावास और संपर्कों में आपकी सहायता कर सकता हूँ। आप क्या जानना चाहते हैं?"
                })
            return

        # 7. API: Load Announcements (Unprotected for Ticker/News/Events)
        elif path == '/api/announcements':
            from urllib.parse import parse_qs
            query_params = parse_qs(parsed_path.query)
            t = query_params.get('type', [''])[0].strip().lower()
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            if t:
                c.execute('SELECT id, title_en, title_hi, desc_en, desc_hi, type, image_url, date_str, created_at FROM announcements WHERE type = ? ORDER BY created_at DESC', (t,))
            else:
                c.execute('SELECT id, title_en, title_hi, desc_en, desc_hi, type, image_url, date_str, created_at FROM announcements ORDER BY created_at DESC')
            rows = c.fetchall()
            conn.close()
            
            results = [{
                "id": r[0], "title_en": r[1], "title_hi": r[2], 
                "desc_en": r[3], "desc_hi": r[4], "type": r[5], 
                "image_url": r[6], "date_str": r[7], "created_at": r[8]
            } for r in rows]
            self.send_json(200, results)
            return

        # 8. API: Get Gallery Images
        elif path == '/api/gallery':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id, title_en, title_hi, image_url, created_at FROM gallery ORDER BY created_at DESC')
            rows = c.fetchall()
            conn.close()
            results = [{"id": r[0], "title_en": r[1], "title_hi": r[2], "image_url": r[3], "created_at": r[4]} for r in rows]
            self.send_json(200, results)
            return

        # 9. API: Get Departments
        elif path == '/api/departments':
            from urllib.parse import parse_qs
            query_params = parse_qs(parsed_path.query)
            slug = query_params.get('dept', [''])[0].strip().lower()
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            if slug:
                c.execute('SELECT slug, name, school, icon, summary, vision, established, intake_info, admission_mode, head_of_department FROM departments WHERE slug = ?', (slug,))
                row = c.fetchone()
                if not row:
                    conn.close()
                    self.send_json(404, { "error": "Department not found." })
                    return
                dept = {
                    "slug": row[0], "name": row[1], "school": row[2], "icon": row[3],
                    "summary": row[4], "vision": row[5], "established": row[6],
                    "intake_info": row[7], "admission_mode": row[8], "head_of_department": row[9]
                }
                # Load programmes
                c.execute('SELECT name, level, duration, seats, entrance, eligibility, description, syllabus_url FROM department_programmes WHERE department_slug = ?', (slug,))
                progs = c.fetchall()
                dept["programmes"] = [{
                    "name": p[0], "level": p[1], "duration": p[2], "seats": p[3],
                    "entrance": p[4], "eligibility": p[5], "description": p[6], "syllabus_url": p[7]
                } for p in progs]
                # Load faculty
                c.execute('SELECT name, designation, specialization, email, image_url FROM department_faculty WHERE department_slug = ?', (slug,))
                facs = c.fetchall()
                dept["faculty"] = [{
                    "name": f[0], "designation": f[1], "specialization": f[2], "email": f[3], "image_url": f[4]
                } for f in facs]
                # Load research
                c.execute('SELECT area FROM department_research WHERE department_slug = ?', (slug,))
                res = c.fetchall()
                dept["research"] = [r[0] for r in res]
                
                conn.close()
                self.send_json(200, dept)
                return
            else:
                c.execute('SELECT slug, name, school, icon, summary, established, head_of_department FROM departments ORDER BY name')
                rows = c.fetchall()
                conn.close()
                results = [{
                    "slug": r[0], "name": r[1], "school": r[2], "icon": r[3],
                    "summary": r[4], "established": r[5], "head_of_department": r[6]
                } for r in rows]
                self.send_json(200, results)
                return

        # 10. API: Get Hostels
        elif path == '/api/hostels':
            from urllib.parse import parse_qs
            query_params = parse_qs(parsed_path.query)
            slug = query_params.get('hostel', [''])[0].strip().lower()
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            if slug:
                c.execute('SELECT slug, name, type, description, total_rooms, security_details, common_facilities, mess_system, image_url FROM hostels WHERE slug = ?', (slug,))
                row = c.fetchone()
                if not row:
                    conn.close()
                    self.send_json(404, { "error": "Hostel not found." })
                    return
                hostel = {
                    "slug": row[0], "name": row[1], "type": row[2], "description": row[3],
                    "total_rooms": row[4], "security_details": row[5], "common_facilities": row[6],
                    "mess_system": row[7], "image_url": row[8]
                }
                c.execute('SELECT name, role, department, image_url FROM hostel_wardens WHERE hostel_slug = ?', (slug,))
                wardens = c.fetchall()
                hostel["wardens"] = [{
                    "name": w[0], "role": w[1], "department": w[2], "image_url": w[3]
                } for w in wardens]
                conn.close()
                self.send_json(200, hostel)
                return
            else:
                c.execute('SELECT slug, name, type, description, total_rooms, security_details, common_facilities, mess_system, image_url FROM hostels')
                rows = c.fetchall()
                hostels = []
                for r in rows:
                    hslug = r[0]
                    h = {
                        "slug": hslug, "name": r[1], "type": r[2], "description": r[3],
                        "total_rooms": r[4], "security_details": r[5], "common_facilities": r[6],
                        "mess_system": r[7], "image_url": r[8]
                    }
                    c.execute('SELECT name, role, department, image_url FROM hostel_wardens WHERE hostel_slug = ?', (hslug,))
                    wardens = c.fetchall()
                    h["wardens"] = [{
                        "name": w[0], "role": w[1], "department": w[2], "image_url": w[3]
                    } for w in wardens]
                    hostels.append(h)
                conn.close()
                self.send_json(200, hostels)
                return

        # 11. API: List Admin Users (Protected)
        elif path == '/api/admin/list-users':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT username, created_at FROM admin_users ORDER BY username')
            rows = c.fetchall()
            conn.close()
            users = [{"username": r[0], "created_at": r[1]} for r in rows]
            self.send_json(200, users)
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
            type_ = data.get('type', 'ticker').strip()
            image_url = data.get('imageUrl', '').strip() or None
            date_str = data.get('dateStr', '').strip() or None
            
            if not title_en or not title_hi or not desc_en or not desc_hi:
                self.send_json(400, { "error": "All announcement fields are required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''
                INSERT INTO announcements (title_en, title_hi, desc_en, desc_hi, type, image_url, date_str) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (title_en, title_hi, desc_en, desc_hi, type_, image_url, date_str))
            
            # Auto-index the announcement for real-time search
            c.execute('INSERT INTO search_index (title, tags, desc, url) VALUES (?, ?, ?, ?)',
                      (title_en, f"announcement news update notice {type_} {title_en.lower()}", desc_en, "index.html#notices"))
                      
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Published Announcement ({type_}): {title_en[:30]}..."))
            conn.commit()
            conn.close()
            
            self.send_json(200, { "success": True })
            return

        # 4b. API: Delete Announcement (Protected)
        elif path == '/api/announcements/delete':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            id_ = data.get('id')
            if id_ is None:
                self.send_json(400, { "error": "Announcement ID required." })
                return
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT title_en FROM announcements WHERE id = ?', (id_,))
            row = c.fetchone()
            if row:
                title = row[0]
                c.execute('DELETE FROM announcements WHERE id = ?', (id_,))
                c.execute('DELETE FROM search_index WHERE title = ? AND tags LIKE "%announcement%"', (title,))
                c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                          (username, f"Deleted Announcement: {title[:30]}..."))
                conn.commit()
            conn.close()
            self.send_json(200, { "success": True })
            return

        # 5. API: Add Gallery Image (Protected)
        elif path == '/api/gallery':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            title_en = data.get('titleEn', '').strip()
            title_hi = data.get('titleHi', '').strip()
            image_url = data.get('imageUrl', '').strip()
            
            if not title_en or not title_hi or not image_url:
                self.send_json(400, { "error": "All gallery fields are required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('INSERT INTO gallery (title_en, title_hi, image_url) VALUES (?, ?, ?)', 
                      (title_en, title_hi, image_url))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Added Gallery Image: {title_en}"))
            conn.commit()
            conn.close()
            self.send_json(200, { "success": True })
            return

        # 5b. API: Delete Gallery Image (Protected)
        elif path == '/api/gallery/delete':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            id_ = data.get('id')
            if id_ is None:
                self.send_json(400, { "error": "Gallery ID required." })
                return
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT title_en FROM gallery WHERE id = ?', (id_,))
            row = c.fetchone()
            if row:
                title = row[0]
                c.execute('DELETE FROM gallery WHERE id = ?', (id_,))
                c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                          (username, f"Deleted Gallery Image: {title}"))
                conn.commit()
            conn.close()
            self.send_json(200, { "success": True })
            return

        # 6. API: Update Department Details (Protected)
        elif path == '/api/departments/update':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            slug = data.get('slug', '').strip()
            name = data.get('name', '').strip()
            school = data.get('school', '').strip()
            summary = data.get('summary', '').strip()
            vision = data.get('vision', '').strip()
            established = data.get('established', '').strip()
            intake_info = data.get('intake_info', '').strip()
            head_of_department = data.get('head_of_department', '').strip()
            
            if not slug or not name:
                self.send_json(400, { "error": "Slug and Name are required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''
                UPDATE departments 
                SET name = ?, school = ?, summary = ?, vision = ?, established = ?, intake_info = ?, head_of_department = ?
                WHERE slug = ?
            ''', (name, school, summary, vision, established, intake_info, head_of_department, slug))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Updated Department content: {name}"))
            conn.commit()
            conn.close()
            self.send_json(200, { "success": True })
            return

        # 7. API: Update Hostel Details (Protected)
        elif path == '/api/hostels/update':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            slug = data.get('slug', '').strip()
            name = data.get('name', '').strip()
            description = data.get('description', '').strip()
            total_rooms = data.get('total_rooms', '').strip()
            security_details = data.get('security_details', '').strip()
            common_facilities = data.get('common_facilities', '').strip()
            mess_system = data.get('mess_system', '').strip()
            
            if not slug or not name:
                self.send_json(400, { "error": "Slug and Name are required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''
                UPDATE hostels 
                SET name = ?, description = ?, total_rooms = ?, security_details = ?, common_facilities = ?, mess_system = ?
                WHERE slug = ?
            ''', (name, description, total_rooms, security_details, common_facilities, mess_system, slug))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Updated Hostel content: {name}"))
            conn.commit()
            conn.close()
            self.send_json(200, { "success": True })
            return

        # 8. API: Update current admin credentials (Protected)
        elif path == '/api/admin/update-credentials':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            new_username = data.get('username', '').strip()
            new_password = data.get('password', '')
            
            if not new_username:
                self.send_json(400, { "error": "Username required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id FROM admin_users WHERE username = ? AND username != ?', (new_username, username))
            if c.fetchone():
                conn.close()
                self.send_json(409, { "error": "Username already taken by another admin." })
                return
                
            if new_password:
                if len(new_password) < 8:
                    conn.close()
                    self.send_json(400, { "error": "Password must be at least 8 characters." })
                    return
                pwd_hash, salt = hash_password(new_password)
                c.execute('UPDATE admin_users SET username = ?, password_hash = ?, salt = ? WHERE username = ?', 
                          (new_username, pwd_hash, salt, username))
            else:
                c.execute('UPDATE admin_users SET username = ? WHERE username = ?', 
                          (new_username, username))
            
            # Update active sessions to keep user logged in with new name
            c.execute('UPDATE sessions SET username = ? WHERE username = ?', (new_username, username))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (new_username, f"Admin updated credentials (changed from {username} to {new_username})"))
            conn.commit()
            conn.close()
            self.send_json(200, { "success": True, "new_username": new_username })
            return

        # 9. API: Create New Admin User (Protected - Authority Delegation)
        elif path == '/api/admin/create-user':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            new_user = data.get('username', '').strip()
            new_pwd = data.get('password', '')
            
            if not new_user or len(new_pwd) < 8:
                self.send_json(400, { "error": "Invalid username or password (min 8 characters)." })
                return
                
            pwd_hash, salt = hash_password(new_pwd)
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            try:
                c.execute('INSERT INTO admin_users (username, password_hash, salt) VALUES (?, ?, ?)', 
                          (new_user, pwd_hash, salt))
                c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                          (username, f"Delegated authority: created new Admin {new_user}"))
                conn.commit()
            except sqlite3.IntegrityError:
                conn.close()
                self.send_json(409, { "error": "Admin username already exists." })
                return
            conn.close()
            self.send_json(200, { "success": True })
            return

        # 10. API: Delete Secondary Admin User (Protected)
        elif path == '/api/admin/delete-user':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            target_user = data.get('username', '').strip()
            
            if not target_user:
                self.send_json(400, { "error": "Username required." })
                return
                
            if target_user == username:
                self.send_json(400, { "error": "You cannot delete your own active account." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('DELETE FROM admin_users WHERE username = ?', (target_user,))
            c.execute('DELETE FROM sessions WHERE username = ?', (target_user,))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Revoked authority: deleted Admin {target_user}"))
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
