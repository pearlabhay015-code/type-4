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
            type TEXT,
            image_url TEXT,
            date_str TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title_en TEXT NOT NULL,
            title_hi TEXT NOT NULL,
            image_url TEXT NOT NULL,
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

    c.execute('''
        CREATE TABLE IF NOT EXISTS schools (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            short_description TEXT,
            description TEXT,
            office_email TEXT,
            office_phone TEXT,
            sort_order INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS admissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            academic_year TEXT NOT NULL,
            description TEXT,
            eligibility TEXT,
            application_start_date TEXT,
            application_end_date TEXT,
            brochure_url TEXT,
            apply_url TEXT,
            status TEXT DEFAULT 'published',
            priority_level INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS recruitment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            post_name TEXT,
            advertisement_no TEXT,
            description TEXT,
            opening_date TEXT,
            closing_date TEXT,
            document_url TEXT,
            apply_url TEXT,
            status TEXT DEFAULT 'published',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS tenders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            tender_no TEXT,
            description TEXT,
            opening_date TEXT,
            closing_date TEXT,
            estimated_value REAL,
            emd_amount REAL,
            document_url TEXT,
            status TEXT DEFAULT 'published',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS administration (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            designation TEXT NOT NULL,
            message TEXT,
            profile_photo_url TEXT,
            email TEXT,
            phone TEXT,
            office_location TEXT,
            sort_order INTEGER DEFAULT 0,
            status TEXT DEFAULT 'active'
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS research_projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_slug TEXT,
            pi_name TEXT NOT NULL,
            title TEXT NOT NULL,
            funding_agency TEXT,
            grant_amount REAL,
            start_date TEXT,
            end_date TEXT,
            summary TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS publications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            faculty_name TEXT,
            department_slug TEXT,
            title TEXT NOT NULL,
            publication_type TEXT NOT NULL,
            authors TEXT NOT NULL,
            journal_or_publisher TEXT,
            publication_year INTEGER,
            doi TEXT,
            url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Department profile content. These tables back the reusable department
    # page and keep programmes, faculty, research, and outcome figures editable
    # without creating a separate hard-coded page for each department.
    c.execute('''
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            school TEXT,
            icon TEXT,
            summary TEXT,
            vision TEXT,
            established TEXT,
            intake_info TEXT,
            admission_mode TEXT,
            head_of_department TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS department_programmes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_slug TEXT NOT NULL,
            name TEXT NOT NULL,
            level TEXT,
            duration TEXT,
            seats TEXT,
            entrance TEXT,
            eligibility TEXT,
            description TEXT,
            syllabus_url TEXT,
            sort_order INTEGER DEFAULT 0
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS department_faculty (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_slug TEXT NOT NULL,
            name TEXT NOT NULL,
            designation TEXT,
            specialization TEXT,
            email TEXT,
            image_url TEXT,
            sort_order INTEGER DEFAULT 0
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS department_research (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_slug TEXT NOT NULL,
            area TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS department_statistics (
            department_slug TEXT PRIMARY KEY,
            current_students INTEGER,
            passed_students INTEGER,
            current_phd_scholars INTEGER,
            passed_phd_scholars INTEGER,
            source_note TEXT,
            is_estimated INTEGER DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS student_achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            tag TEXT NOT NULL,
            icon TEXT DEFAULT '🏆',
            icon_color TEXT DEFAULT '#004b9b',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS events_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            event_date TEXT NOT NULL,
            event_time TEXT NOT NULL,
            category TEXT NOT NULL,
            category_color TEXT DEFAULT '#28a745',
            border_color TEXT DEFAULT '#28a745',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Seed student_achievements if empty
    c.execute('SELECT COUNT(*) FROM student_achievements')
    if c.fetchone()[0] == 0:
        achievements_seed = [
            ("National Hackathon & Web Competition", "Computer Science team won 1st prize in 24-hr Smart Web & AI Design Competition", "🥇 Gold Winner • 2 days ago", "🏆", "#004b9b"),
            ("₹1.2 Crore DST-SERB Research Grant", "Physical Sciences & Bioinformatics faculty awarded DST-SERB grant for Quantum Materials", "⭐ Research Grant • 4 days ago", "💡", "#b8860b"),
            ("Inter-Department Athletics Meet 2026", "800+ student athletes competed in 18 track & field events at CUSB Sports Stadium", "🏃 800+ Athletes • 1 week ago", "🤝", "#28a745"),
            ("NAAC Institutional Accreditation", "CUSB awarded top rating for excellence in higher education, research & green campus", "🏛️ Top Rating • 2 weeks ago", "🗣️", "#6f42c1")
        ]
        c.executemany('''
            INSERT INTO student_achievements (title, description, tag, icon, icon_color)
            VALUES (?, ?, ?, ?, ?)
        ''', achievements_seed)

    # Seed events_schedule if empty
    c.execute('SELECT COUNT(*) FROM events_schedule')
    if c.fetchone()[0] == 0:
        schedule_seed = [
            ("45th INCA International Congress", "2026-03-18", "9:30 AM - 4:30 PM", "International Conference • Gaya Campus", "rgba(40,167,69,0.12)", "#28a745"),
            ("National Science Day Exhibition", "2026-03-18", "10:00 AM - 2:00 PM", "School of Physical Sciences", "rgba(214,155,23,0.15)", "#b8860b"),
            ("CUSB Foundation Day & Cultural Fest", "2026-03-18", "5:00 PM - 9:00 PM", "Annual Celebration • Main Auditorium", "rgba(111,66,193,0.12)", "#6f42c1")
        ]
        c.executemany('''
            INSERT INTO events_schedule (title, event_date, event_time, category, category_color, border_color)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', schedule_seed)

    # Seed audit_logs if empty
    c.execute('SELECT COUNT(*) FROM audit_logs')
    if c.fetchone()[0] == 0:
        logs_seed = [
            ("Abhay Kumar (Admin)", "Published announcement: CUSB PG Admissions Bulletin 2026."),
            ("Prof. K. N. Singh (VC)", "Approved 45th INCA International Congress schedule."),
            ("Recruitment Cell", "Updated non-teaching staff recruitment notification & details."),
            ("Computer Science Dept", "Uploaded M.Sc. CS & Ph.D. course syllabi and PYQ resources."),
            ("IQAC Coordinator", "Updated NAAC institutional accreditation data and faculty directory.")
        ]
        c.executemany('''
            INSERT INTO audit_logs (username, action)
            VALUES (?, ?)
        ''', logs_seed)

    # Older local databases predate ordering and timestamp columns. Apply the
    # small, non-destructive migrations here so upgrading the project preserves
    # existing department entries.
    department_migrations = {
        'departments': [('updated_at', 'TIMESTAMP')],
        'department_programmes': [('sort_order', 'INTEGER DEFAULT 0')],
        'department_faculty': [('sort_order', 'INTEGER DEFAULT 0')],
        'department_research': [('sort_order', 'INTEGER DEFAULT 0')]
    }
    for table, columns in department_migrations.items():
        c.execute(f'PRAGMA table_info({table})')
        existing_columns = {column[1] for column in c.fetchall()}
        for column_name, column_type in columns:
            if column_name not in existing_columns:
                c.execute(f'ALTER TABLE {table} ADD COLUMN {column_name} {column_type}')

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
    
    # Preflight OPTIONS request handler
    def do_OPTIONS(self):
        self.send_response(200)
        origin = self.headers.get('Origin')
        if origin:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Cookie, X-Session-Token')
        self.end_headers()

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
        
        origin = self.headers.get('Origin')
        if origin:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Access-Control-Allow-Credentials', 'true')
            
        if headers:
            for k, v in headers.items():
                self.send_header(k, v)
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    # Retrieve current valid session username from cookie or header
    def get_session_username(self):
        session_token = None
        
        # 1. Try custom header first (helps with cross-origin local testing)
        token_header = self.headers.get('X-Session-Token')
        if token_header:
            session_token = token_header.strip()
            
        # 2. Fall back to Cookie
        if not session_token:
            cookie_header = self.headers.get('Cookie')
            if cookie_header:
                cookie = SimpleCookie(cookie_header)
                if 'session_token' in cookie:
                    session_token = cookie['session_token'].value
        
        if not session_token:
            return None
        
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

        # 4b. API: Load Dashboard Widgets Data
        elif path == '/api/dashboard/widgets':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()

            # 1. Notice Board
            c.execute('SELECT id, title_en, desc_en, type, image_url, date_str, created_at FROM announcements ORDER BY id DESC LIMIT 5')
            ann_rows = c.fetchall()
            notices = [{
                "id": r[0], "title": r[1], "desc": r[2], "type": r[3],
                "image_url": r[4] or 'assets/images/blockB.jpg',
                "date_str": r[5] or 'March 10, 2026', "created_at": r[6]
            } for r in ann_rows]

            # 2. Student Achievements
            c.execute('SELECT id, title, description, tag, icon, icon_color FROM student_achievements ORDER BY id DESC LIMIT 6')
            ach_rows = c.fetchall()
            achievements = [{
                "id": r[0], "title": r[1], "desc": r[2], "tag": r[3],
                "icon": r[4], "icon_color": r[5]
            } for r in ach_rows]

            # 3. Schedule
            c.execute('SELECT id, title, event_date, event_time, category, category_color, border_color FROM events_schedule ORDER BY id ASC LIMIT 6')
            sch_rows = c.fetchall()
            schedule = [{
                "id": r[0], "title": r[1], "event_date": r[2], "event_time": r[3],
                "category": r[4], "category_color": r[5], "border_color": r[6]
            } for r in sch_rows]

            # 4. Recent Activities (Audit Logs)
            c.execute('SELECT id, username, action, created_at FROM audit_logs ORDER BY id DESC LIMIT 6')
            log_rows = c.fetchall()
            recent_activities = [{
                "id": r[0], "username": r[1], "action": r[2], "created_at": r[3]
            } for r in log_rows]

            conn.close()
            self.send_json(200, {
                "notice_board": notices,
                "achievements": achievements,
                "schedule": schedule,
                "recent_activities": recent_activities
            })
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
            results = []
            like_pattern = f'%{q}%'
            
            # 1. Search index (static pages)
            c.execute('''
                SELECT title, desc, url, tags 
                FROM search_index 
                WHERE title LIKE ? OR tags LIKE ? OR desc LIKE ?
                LIMIT 15
            ''', (like_pattern, like_pattern, like_pattern))
            for row in c.fetchall():
                results.append({
                    "title": row[0],
                    "desc": row[1],
                    "url": row[2],
                    "tags": row[3]
                })
                
            # 2. Faculty members
            c.execute('''
                SELECT name, designation, specialization, email, department_slug 
                FROM department_faculty 
                WHERE name LIKE ? OR designation LIKE ? OR specialization LIKE ?
                LIMIT 10
            ''', (like_pattern, like_pattern, like_pattern))
            for row in c.fetchall():
                name, designation, spec, email, dept_slug = row
                dname = "Computer Science" if dept_slug == 'computer_science' else dept_slug.replace('_', ' ').replace('-', ' ').title()
                results.append({
                    "title": f"{name} ({designation})",
                    "desc": f"Faculty in Department of {dname}. Specialization: {spec}. Contact: {email}",
                    "url": f"cs.html#faculty" if dept_slug in ('computer-science', 'computer_science') else f"department.html?slug={dept_slug}#faculty",
                    "tags": "faculty, academic, staff"
                })
                
            # 3. Announcements (News, Events, Circulars, Dates)
            c.execute('''
                SELECT title_en, title_hi, desc_en, type, date_str 
                FROM announcements 
                WHERE title_en LIKE ? OR title_hi LIKE ? OR desc_en LIKE ? OR desc_hi LIKE ?
                LIMIT 15
            ''', (like_pattern, like_pattern, like_pattern, like_pattern))
            for row in c.fetchall():
                title_en, title_hi, desc_en, type_, date_str = row
                results.append({
                    "title": title_en,
                    "desc": desc_en[:150] + '...' if len(desc_en) > 150 else desc_en,
                    "url": f"news-events.html?type={type_}",
                    "tags": f"news, announcement, {type_}"
                })
                
            # 4. Hostels
            c.execute('''
                SELECT name, type, description, common_facilities 
                FROM hostels 
                WHERE name LIKE ? OR description LIKE ? OR common_facilities LIKE ?
                LIMIT 5
            ''', (like_pattern, like_pattern, like_pattern))
            for row in c.fetchall():
                name, htype, desc, facilities = row
                results.append({
                    "title": f"{name} Hostel ({htype.capitalize()})",
                    "desc": f"{desc} Facilities: {facilities}",
                    "url": "hostel.html",
                    "tags": "hostel, campus, accommodation"
                })
                
            # 5. Hostel Wardens
            c.execute('''
                SELECT name, role, department, hostel_slug 
                FROM hostel_wardens 
                WHERE name LIKE ? OR role LIKE ? OR department LIKE ?
                LIMIT 5
            ''', (like_pattern, like_pattern, like_pattern))
            for row in c.fetchall():
                name, role, dept, hostel_slug = row
                hname = hostel_slug.replace('_', ' ').replace('-', ' ').title()
                results.append({
                    "title": f"{name} ({role})",
                    "desc": f"{role} of {hname}. Affiliated Department: {dept}",
                    "url": "hostel.html#wardens",
                    "tags": "warden, hostel, staff"
                })
                
            # 6. Academic Departments
            c.execute('''
                SELECT name, school, summary, slug 
                FROM departments 
                WHERE name LIKE ? OR school LIKE ? OR summary LIKE ?
                LIMIT 5
            ''', (like_pattern, like_pattern, like_pattern))
            for row in c.fetchall():
                name, school, summary, slug = row
                results.append({
                    "title": f"Department of {name}",
                    "desc": f"School: {school}. Summary: {summary}",
                    "url": "cs.html" if slug in ('computer-science', 'computer_science') else f"department.html?slug={slug}",
                    "tags": "department, academic, courses"
                })
                
            # 7. Department Programmes
            c.execute('''
                SELECT name, level, duration, entrance, eligibility, department_slug 
                FROM department_programmes 
                WHERE name LIKE ? OR level LIKE ? OR eligibility LIKE ?
                LIMIT 5
            ''', (like_pattern, like_pattern, like_pattern))
            for row in c.fetchall():
                name, level, duration, entrance, eligibility, dept_slug = row
                results.append({
                    "title": f"{name} ({level})",
                    "desc": f"Duration: {duration}. Entrance Exam: {entrance}. Eligibility: {eligibility}",
                    "url": "cs.html#programmes" if dept_slug in ('computer-science', 'computer_science') else f"department.html?slug={dept_slug}#programmes",
                    "tags": "course, programme, academic"
                })
                
            conn.close()
            
            # Deduplicate results by URL and Title
            seen = set()
            unique_results = []
            for r in results:
                key = (r['title'].lower(), r['url'].lower())
                if key not in seen:
                    seen.add(key)
                    unique_results.append(r)
            
            self.send_json(200, unique_results[:20])
            return

        # 6. API: Chatbot assistant response
        elif path == '/api/chat':
            from urllib.parse import parse_qs
            query_params = parse_qs(parsed_path.query)
            q = query_params.get('q', [''])[0].strip().lower()
            
        elif path == '/api/chat':
            from urllib.parse import parse_qs
            query_params = parse_qs(parsed_path.query)
            q = query_params.get('q', [''])[0].strip().lower()
            
            if not q:
                self.send_json(200, {"en": "How can I help you?", "hi": "मैं आपकी क्या मदद कर सकता हूँ?"})
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            
            # Extract query words for advanced matches
            q_words = [w for w in q.split() if len(w) > 3]
            
            # Step A: Check for PYQs (Previous Year Papers) first to avoid FAQ category overlap
            if "pyq" in q or "question paper" in q or "previous year" in q or "paper" in q:
                c.execute('SELECT department_slug, level, type, year, semester, download_url FROM pyqs')
                pyq_rows = c.fetchall()
                matched_pyqs = []
                for dept_slug, level, ptype, year, sem, download_url in pyq_rows:
                    dept_name = dept_slug.replace('_', ' ').replace('-', ' ').lower()
                    if dept_name in q or level.lower() in q or any(w in dept_name for w in q_words):
                        matched_pyqs.append((dept_slug, level, ptype, year, sem, download_url))
                
                if matched_pyqs:
                    items_en = []
                    items_hi = []
                    for dept_slug, level, ptype, year, sem, download_url in matched_pyqs[:3]:
                        dname = dept_slug.replace('_', ' ').replace('-', ' ').title()
                        items_en.append(f"- {dname} ({level}) - {ptype} {year} (Sem {sem}): [Download]({download_url})")
                        items_hi.append(f"- {dname} ({level}) - {ptype} {year} (सेमेस्टर {sem}): [डाउनलोड]({download_url})")
                    
                    resp_en = "Here are the previous year question papers I found:\n" + "\n".join(items_en)
                    resp_hi = "मुझे निम्नलिखित पिछले वर्ष के प्रश्न पत्र मिले हैं:\n" + "\n".join(items_hi)
                    conn.close()
                    self.send_json(200, {"en": resp_en, "hi": resp_hi})
                    return

            # Step B: Check Announcements (News, Events, Circulars, Dates) before standard FAQ
            c.execute('SELECT title_en, title_hi, desc_en, type, date_str FROM announcements')
            ann_rows = c.fetchall()
            matched_anns = []
            for title_en, title_hi, desc_en, type_, date_str in ann_rows:
                title_lower = title_en.lower()
                desc_lower = desc_en.lower()
                title_hi_lower = title_hi.lower()
                
                is_match = (q in title_lower) or (q in desc_lower) or (q in title_hi_lower)
                if not is_match and q_words:
                    is_match = any(word in title_lower or word in desc_lower for word in q_words)
                
                if not is_match:
                    is_match = (type_ in q and ("latest" in q or "recent" in q or "news" in q or "event" in q or "circular" in q or "date" in q or "show" in q or "what" in q or "any" in q))
                    
                if is_match:
                    matched_anns.append((title_en, title_hi, desc_en, type_, date_str))
            
            if matched_anns:
                items_en = []
                items_hi = []
                for title_en, title_hi, desc_en, type_, date_str in matched_anns[:4]:
                    items_en.append(f"- **{title_en}** ({type_.upper()} - {date_str or 'Recent'})")
                    items_hi.append(f"- **{title_hi}** ({type_.upper()} - {date_str or 'हाल ही में'})")
                
                resp_en = "Here are the updates/news I found:\n" + "\n".join(items_en)
                resp_hi = "मुझे निम्नलिखित अपडेट/समाचार मिले हैं:\n" + "\n".join(items_hi)
                conn.close()
                self.send_json(200, {"en": resp_en, "hi": resp_hi})
                return

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
                
            # Step 8: Search Index Fallback
            c.execute('SELECT title, desc, url FROM search_index')
            idx_rows = c.fetchall()
            matched_idx = None
            for title, desc, url in idx_rows:
                title_lower = title.lower()
                desc_lower = desc.lower()
                is_match = (q in title_lower) or (q in desc_lower)
                if not is_match and q_words:
                    is_match = any(word in title_lower for word in q_words)
                if is_match:
                    matched_idx = (title, desc, url)
                    break
            
            if matched_idx:
                title, desc, url = matched_idx
                resp_en = f"You can find information about '{title}' on our site here: [{title}]({url}).\nDescription: {desc}"
                resp_hi = f"आप '{title}' के बारे में जानकारी हमारी वेबसाइट पर यहाँ देख सकते हैं: [{title}]({url})।\nविवरण: {desc}"
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
            archive = query_params.get('archive', [''])[0].strip().lower() == 'true'
            show_all = query_params.get('show_all', [''])[0].strip().lower() == 'true'
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            
            query = 'SELECT id, title_en, title_hi, desc_en, desc_hi, type, image_url, date_str, created_at FROM announcements'
            params = []
            conditions = []
            
            if t:
                conditions.append('type = ?')
                params.append(t)
                
            if not show_all:
                if archive:
                    conditions.append("created_at < datetime('now', '-60 days')")
                else:
                    conditions.append("created_at >= datetime('now', '-60 days')")
                    
            if conditions:
                query += ' WHERE ' + ' AND '.join(conditions)
                
            query += ' ORDER BY created_at DESC'
            
            c.execute(query, tuple(params))
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
                c.execute('SELECT slug, name, school, icon, summary, vision, established, intake_info, admission_mode, head_of_department, updated_at FROM departments WHERE slug = ?', (slug,))
                row = c.fetchone()
                if not row:
                    conn.close()
                    self.send_json(404, { "error": "Department not found." })
                    return
                dept = {
                    "slug": row[0], "name": row[1], "school": row[2], "icon": row[3],
                    "summary": row[4], "vision": row[5], "established": row[6],
                    "intake_info": row[7], "admission_mode": row[8], "head_of_department": row[9],
                    "updated_at": row[10]
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
                # Statistics are optional: the page clearly labels its local
                # illustrative fallback until verified figures are entered.
                c.execute('''
                    SELECT current_students, passed_students, current_phd_scholars,
                           passed_phd_scholars, source_note, is_estimated, updated_at
                    FROM department_statistics WHERE department_slug = ?
                ''', (slug,))
                stats = c.fetchone()
                if stats:
                    dept["statistics"] = {
                        "current_students": stats[0], "passed_students": stats[1],
                        "current_phd_scholars": stats[2], "passed_phd_scholars": stats[3],
                        "source_note": stats[4], "is_estimated": bool(stats[5]), "updated_at": stats[6]
                    }
                
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

        # 12. API: Get Schools & Departments Hierarchy
        elif path == '/api/schools':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id, name, slug, short_description, description, office_email, office_phone FROM schools ORDER BY sort_order, name')
            school_rows = c.fetchall()
            schools = []
            for s in school_rows:
                s_id, s_name, s_slug, s_short, s_desc, s_email, s_phone = s
                c.execute('SELECT slug, name, summary, head_of_department FROM departments WHERE school = ? ORDER BY name', (s_name,))
                dept_rows = c.fetchall()
                schools.append({
                    "id": s_id, "name": s_name, "slug": s_slug,
                    "short_description": s_short, "description": s_desc,
                    "office_email": s_email, "office_phone": s_phone,
                    "departments": [{"slug": d[0], "name": d[1], "summary": d[2], "head_of_department": d[3]} for d in dept_rows]
                })
            conn.close()
            self.send_json(200, schools)
            return

        # 13. API: Get Admissions
        elif path == '/api/admissions':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id, title, slug, academic_year, description, eligibility, application_start_date, application_end_date, brochure_url, apply_url, status, priority_level FROM admissions ORDER BY priority_level DESC, created_at DESC')
            rows = c.fetchall()
            conn.close()
            results = [{
                "id": r[0], "title": r[1], "slug": r[2], "academic_year": r[3],
                "description": r[4], "eligibility": r[5], "application_start_date": r[6],
                "application_end_date": r[7], "brochure_url": r[8], "apply_url": r[9],
                "status": r[10], "priority_level": r[11]
            } for r in rows]
            self.send_json(200, results)
            return

        # 14. API: Get Recruitment Notices
        elif path == '/api/recruitment':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id, title, slug, post_name, advertisement_no, description, opening_date, closing_date, document_url, apply_url, status FROM recruitment ORDER BY closing_date DESC, created_at DESC')
            rows = c.fetchall()
            conn.close()
            results = [{
                "id": r[0], "title": r[1], "slug": r[2], "post_name": r[3],
                "advertisement_no": r[4], "description": r[5], "opening_date": r[6],
                "closing_date": r[7], "document_url": r[8], "apply_url": r[9], "status": r[10]
            } for r in rows]
            self.send_json(200, results)
            return

        # 15. API: Get Tenders & Procurement Notices
        elif path == '/api/tenders':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id, title, slug, tender_no, description, opening_date, closing_date, estimated_value, emd_amount, document_url, status FROM tenders ORDER BY closing_date DESC, created_at DESC')
            rows = c.fetchall()
            conn.close()
            results = [{
                "id": r[0], "title": r[1], "slug": r[2], "tender_no": r[3],
                "description": r[4], "opening_date": r[5], "closing_date": r[6],
                "estimated_value": r[7], "emd_amount": r[8], "document_url": r[9], "status": r[10]
            } for r in rows]
            self.send_json(200, results)
            return

        # 16. API: Get Administration Leadership
        elif path == '/api/administration':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id, name, designation, message, profile_photo_url, email, phone, office_location, sort_order, status FROM administration ORDER BY sort_order, id')
            rows = c.fetchall()
            conn.close()
            results = [{
                "id": r[0], "name": r[1], "designation": r[2], "message": r[3],
                "profile_photo_url": r[4], "email": r[5], "phone": r[6],
                "office_location": r[7], "sort_order": r[8], "status": r[9]
            } for r in rows]
            self.send_json(200, results)
            return

        # 17. API: Get Research Projects & Publications
        elif path == '/api/research':
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('SELECT id, department_slug, pi_name, title, funding_agency, grant_amount, start_date, end_date, summary FROM research_projects ORDER BY start_date DESC')
            proj_rows = c.fetchall()
            c.execute('SELECT id, faculty_name, department_slug, title, publication_type, authors, journal_or_publisher, publication_year, doi, url FROM publications ORDER BY publication_year DESC')
            pub_rows = c.fetchall()
            conn.close()
            res = {
                "projects": [{
                    "id": p[0], "department_slug": p[1], "pi_name": p[2], "title": p[3],
                    "funding_agency": p[4], "grant_amount": p[5], "start_date": p[6],
                    "end_date": p[7], "summary": p[8]
                } for p in proj_rows],
                "publications": [{
                    "id": pb[0], "faculty_name": pb[1], "department_slug": pb[2], "title": pb[3],
                    "publication_type": pb[4], "authors": pb[5], "journal_or_publisher": pb[6],
                    "publication_year": pb[7], "doi": pb[8], "url": pb[9]
                } for pb in pub_rows]
            }
            self.send_json(200, res)
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
            
            self.send_json(200, { "success": True, "token": session_token, "username": username }, { "Set-Cookie": cookie.output(header='') })
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
            
            self.send_json(200, { "success": True, "token": session_token, "username": username }, { "Set-Cookie": cookie.output(header='') })
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

        # 4c. API: Update Announcement (Protected)
        elif path == '/api/announcements/update':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            id_ = data.get('id')
            title_en = data.get('titleEn', '').strip()
            title_hi = data.get('titleHi', '').strip()
            desc_en = data.get('descEn', '').strip()
            desc_hi = data.get('descHi', '').strip()
            type_ = data.get('type', 'ticker').strip()
            image_url = data.get('imageUrl', '').strip() or None
            date_str = data.get('dateStr', '').strip() or None
            
            if id_ is None or not title_en or not title_hi or not desc_en or not desc_hi:
                self.send_json(400, { "error": "ID and all announcement fields are required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            # Fetch old title to update search index
            c.execute('SELECT title_en FROM announcements WHERE id = ?', (id_,))
            row = c.fetchone()
            old_title = row[0] if row else None
            
            c.execute('''
                UPDATE announcements 
                SET title_en = ?, title_hi = ?, desc_en = ?, desc_hi = ?, type = ?, image_url = ?, date_str = ?
                WHERE id = ?
            ''', (title_en, title_hi, desc_en, desc_hi, type_, image_url, date_str, id_))
            
            if old_title:
                c.execute('DELETE FROM search_index WHERE title = ? AND tags LIKE "%announcement%"', (old_title,))
            c.execute('INSERT INTO search_index (title, tags, desc, url) VALUES (?, ?, ?, ?)',
                      (title_en, f"announcement news update notice {type_} {title_en.lower()}", desc_en, "index.html#notices"))
                      
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Updated Announcement ({type_}): {title_en[:30]}..."))
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

        # 5c. API: Update Gallery Image (Protected)
        elif path == '/api/gallery/update':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            id_ = data.get('id')
            title_en = data.get('titleEn', '').strip()
            title_hi = data.get('titleHi', '').strip()
            image_url = data.get('imageUrl', '').strip()
            
            if id_ is None or not title_en or not title_hi or not image_url:
                self.send_json(400, { "error": "ID and all gallery fields are required." })
                return
                
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''
                UPDATE gallery 
                SET title_en = ?, title_hi = ?, image_url = ?
                WHERE id = ?
            ''', (title_en, title_hi, image_url, id_))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)', 
                      (username, f"Updated Gallery Image: {title_en}"))
            conn.commit()
            conn.close()
            self.send_json(200, { "success": True })
            return

        # 6. API: Replace a complete Department Profile (Protected)
        elif path == '/api/departments/profile/update':
            username = self.get_session_username()
            if not username:
                self.send_json(401, { "error": "Unauthorized" })
                return
            data = self.get_post_data()
            slug = data.get('slug', '').strip().lower().replace('-', '_')
            name = data.get('name', '').strip()
            if not slug or not name:
                self.send_json(400, { "error": "Slug and name are required." })
                return

            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''
                INSERT INTO departments (slug, name, school, icon, summary, vision, established, intake_info, admission_mode, head_of_department, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(slug) DO UPDATE SET
                    name = excluded.name, school = excluded.school, icon = excluded.icon,
                    summary = excluded.summary, vision = excluded.vision, established = excluded.established,
                    intake_info = excluded.intake_info, admission_mode = excluded.admission_mode,
                    head_of_department = excluded.head_of_department, updated_at = CURRENT_TIMESTAMP
            ''', (slug, name, data.get('school', ''), data.get('icon', ''), data.get('summary', ''),
                  data.get('vision', ''), data.get('established', ''), data.get('intake_info', ''),
                  data.get('admission_mode', ''), data.get('head_of_department', '')))

            for table in ('department_programmes', 'department_faculty', 'department_research'):
                c.execute(f'DELETE FROM {table} WHERE department_slug = ?', (slug,))
            for index, programme in enumerate(data.get('programmes', [])):
                c.execute('''
                    INSERT INTO department_programmes (department_slug, name, level, duration, seats, entrance, eligibility, description, syllabus_url, sort_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (slug, programme.get('name', ''), programme.get('level', ''), programme.get('duration', ''),
                      programme.get('seats', ''), programme.get('entrance', ''), programme.get('eligibility', ''),
                      programme.get('description', ''), programme.get('syllabus_url', ''), index))
            for index, faculty in enumerate(data.get('faculty', [])):
                c.execute('''
                    INSERT INTO department_faculty (department_slug, name, designation, specialization, email, image_url, sort_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (slug, faculty.get('name', ''), faculty.get('designation', ''), faculty.get('specialization', ''),
                      faculty.get('email', ''), faculty.get('image_url', ''), index))
            for index, area in enumerate(data.get('research', [])):
                c.execute('INSERT INTO department_research (department_slug, area, sort_order) VALUES (?, ?, ?)',
                          (slug, area if isinstance(area, str) else area.get('area', ''), index))

            statistics = data.get('statistics')
            if isinstance(statistics, dict):
                c.execute('''
                    INSERT INTO department_statistics (department_slug, current_students, passed_students, current_phd_scholars, passed_phd_scholars, source_note, is_estimated, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(department_slug) DO UPDATE SET
                        current_students = excluded.current_students, passed_students = excluded.passed_students,
                        current_phd_scholars = excluded.current_phd_scholars, passed_phd_scholars = excluded.passed_phd_scholars,
                        source_note = excluded.source_note, is_estimated = excluded.is_estimated, updated_at = CURRENT_TIMESTAMP
                ''', (slug, statistics.get('current_students'), statistics.get('passed_students'),
                      statistics.get('current_phd_scholars'), statistics.get('passed_phd_scholars'),
                      statistics.get('source_note', ''), int(bool(statistics.get('is_estimated', False)))))
            c.execute('INSERT INTO audit_logs (username, action) VALUES (?, ?)',
                      (username, f"Updated complete department profile: {name}"))
            conn.commit()
            conn.close()
            self.send_json(200, { "success": True, "slug": slug })
            return

        # 7. API: Update Department Details (Protected)
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
