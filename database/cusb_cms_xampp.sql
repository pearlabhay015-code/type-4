CREATE DATABASE IF NOT EXISTS cusb_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'cusb_cms'@'localhost' IDENTIFIED BY 'change-this-before-going-live';
CREATE USER IF NOT EXISTS 'cusb_cms'@'127.0.0.1' IDENTIFIED BY 'change-this-before-going-live';
CREATE USER IF NOT EXISTS 'cusb_cms'@'%' IDENTIFIED BY 'change-this-before-going-live';
GRANT SELECT, INSERT, UPDATE, DELETE ON cusb_website.* TO 'cusb_cms'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON cusb_website.* TO 'cusb_cms'@'127.0.0.1';
GRANT SELECT, INSERT, UPDATE, DELETE ON cusb_website.* TO 'cusb_cms'@'%';
FLUSH PRIVILEGES;
USE cusb_website;

CREATE TABLE IF NOT EXISTS cms_admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_sessions (
  token CHAR(64) NOT NULL PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT cms_sessions_user_fk FOREIGN KEY (user_id) REFERENCES cms_admin_users(id) ON DELETE CASCADE,
  INDEX cms_sessions_expiry_idx (expires_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_announcements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255) NOT NULL,
  desc_en TEXT NOT NULL,
  desc_hi TEXT NOT NULL,
  type VARCHAR(40) NOT NULL DEFAULT 'ticker',
  image_url VARCHAR(2048) NULL,
  date_str VARCHAR(100) NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  published_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX cms_announcements_live_idx (status, published_at),
  INDEX cms_announcements_type_idx (type, status, published_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_gallery (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255) NOT NULL,
  image_url VARCHAR(2048) NOT NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX cms_gallery_live_idx (status, sort_order, id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_homepage_stats (
  stat_key VARCHAR(100) NOT NULL PRIMARY KEY,
  stats_json JSON NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO cms_homepage_stats (stat_key, stats_json)
SELECT 'homepage_dashboard', JSON_OBJECT(
  'metrics', JSON_ARRAY(
    JSON_OBJECT('label','Students','value','3,520+','change','+8.4% vs last year','icon','users'),
    JSON_OBJECT('label','Lecturers & Faculty','value','175+','change','+6.2% vs last year','icon','graduation'),
    JSON_OBJECT('label','Research Grants & Awards','value','₹18.5+ Cr','change','+15.8% vs last year','icon','chart'),
    JSON_OBJECT('label','Revenue / Budget','value','₹142.5+ Cr','change','+12.0% vs last year','icon','briefcase')
  ),
  'academicPerformance', JSON_OBJECT('title','Academic Performance','period','Last 4 Years','data',JSON_ARRAY(JSON_OBJECT('label','2023','value',78),JSON_OBJECT('label','2024','value',84),JSON_OBJECT('label','2025','value',91),JSON_OBJECT('label','2026','value',94))),
  'yearlyAdmissions', JSON_OBJECT('title','Yearly Admissions','period','Last 5 Years','data',JSON_ARRAY(JSON_OBJECT('label','2021-22','primary',980,'secondary',620),JSON_OBJECT('label','2022-23','primary',1150,'secondary',780),JSON_OBJECT('label','2023-24','primary',1320,'secondary',940),JSON_OBJECT('label','2024-25','primary',1480,'secondary',1120),JSON_OBJECT('label','2025-26','primary',1650,'secondary',1340))),
  'studentsByState', JSON_OBJECT('title','Students by State','scope','All States & UTs','totalLabel','Enrolled Students','data',JSON_ARRAY(JSON_OBJECT('label','Bihar','share',62,'value',2182,'colour','#1c77ff'),JSON_OBJECT('label','Uttar Pradesh','share',15,'value',528,'colour','#22a447'),JSON_OBJECT('label','Jharkhand','share',10,'value',352,'colour','#ffd950'),JSON_OBJECT('label','West Bengal','share',7,'value',246,'colour','#10a9bb'),JSON_OBJECT('label','Other','share',6,'value',212,'colour','#7a4bc2')))
)
WHERE NOT EXISTS (SELECT 1 FROM cms_homepage_stats WHERE stat_key = 'homepage_dashboard');

CREATE TABLE IF NOT EXISTS cms_audit_logs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  action VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT cms_audit_user_fk FOREIGN KEY (user_id) REFERENCES cms_admin_users(id),
  INDEX cms_audit_recent_idx (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_admission_notices (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  academic_year VARCHAR(30) NOT NULL,
  programme_level VARCHAR(30) NOT NULL DEFAULT 'all',
  description TEXT NULL,
  eligibility TEXT NULL,
  application_start_date DATE NULL,
  application_end_date DATE NULL,
  brochure_url VARCHAR(2048) NULL,
  apply_url VARCHAR(2048) NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX cms_admission_live_idx (status, programme_level, application_end_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_enquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ticket_code VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  category VARCHAR(40) NOT NULL,
  programme_level VARCHAR(40) NULL,
  department VARCHAR(120) NULL,
  message TEXT NOT NULL,
  status ENUM('new','in_progress','resolved','closed') NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX cms_enquiries_status_idx (status, created_at),
  INDEX cms_enquiries_email_idx (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_admission_applications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  application_code VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  programme VARCHAR(180) NOT NULL,
  programme_level VARCHAR(40) NOT NULL,
  external_reference VARCHAR(100) NULL,
  status ENUM('submitted','under_review','admitted','rejected','withdrawn') NOT NULL DEFAULT 'submitted',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX cms_applications_status_idx (status, created_at),
  INDEX cms_applications_email_idx (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_chatbot_faqs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  keywords VARCHAR(500) NOT NULL,
  answer_en TEXT NOT NULL,
  answer_hi TEXT NULL,
  status ENUM('published','archived') NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX cms_chatbot_status_idx (status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cms_search_index (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(2048) NOT NULL,
  keywords VARCHAR(1000) NOT NULL,
  status ENUM('published','archived') NOT NULL DEFAULT 'published',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX cms_search_status_idx (status)
) ENGINE=InnoDB;

INSERT INTO cms_search_index (title, description, url, keywords)
SELECT 'Admissions & Academic Programmes', 'Current admission notices, eligibility, programme information, and official CUET/Samarth application links.', 'admissions.html', 'admission admissions apply cuet samarth ug pg phd eligibility programme course'
WHERE NOT EXISTS (SELECT 1 FROM cms_search_index WHERE url = 'admissions.html');
INSERT INTO cms_search_index (title, description, url, keywords)
SELECT 'News, Events & Notices', 'Latest university announcements, important dates, events, circulars, and updates.', 'news-events.html', 'news announcement notice event circular date latest update'
WHERE NOT EXISTS (SELECT 1 FROM cms_search_index WHERE url = 'news-events.html');
INSERT INTO cms_search_index (title, description, url, keywords)
SELECT 'Hostel & Campus Facilities', 'Hostel accommodation, wardens, mess, campus facilities, and student services.', 'hostel.html', 'hostel accommodation mess warden room campus facilities'
WHERE NOT EXISTS (SELECT 1 FROM cms_search_index WHERE url = 'hostel.html');
INSERT INTO cms_search_index (title, description, url, keywords)
SELECT 'Enquiry & Support Portal', 'Submit an official enquiry for admissions, courses, hostel, scholarship, or general university support.', 'enquiry.html', 'enquiry help support contact scholarship fees admission'
WHERE NOT EXISTS (SELECT 1 FROM cms_search_index WHERE url = 'enquiry.html');

INSERT INTO cms_chatbot_faqs (keywords, answer_en, answer_hi)
SELECT 'admission,apply,cuet,samarth', 'Admissions are handled through CUET/Samarth. See the Admissions page for current notices, eligibility, and official application links.', 'प्रवेश CUET/Samarth के माध्यम से होता है। वर्तमान सूचनाओं, पात्रता और आधिकारिक आवेदन लिंक के लिए प्रवेश पृष्ठ देखें।'
WHERE NOT EXISTS (SELECT 1 FROM cms_chatbot_faqs WHERE keywords = 'admission,apply,cuet,samarth');
