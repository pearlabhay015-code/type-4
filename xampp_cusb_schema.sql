-- Converted from PostgreSQL schema for XAMPP MariaDB/MySQL.
-- PostgreSQL-only extensions, trigger functions, partial indexes, and GIN full-text indexes were skipped.
DROP DATABASE IF EXISTS cusb_website;
CREATE DATABASE cusb_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cusb_website;
SET FOREIGN_KEY_CHECKS=0;
CREATE TABLE roles (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  description TEXT,
  permissions LONGTEXT NOT NULL DEFAULT '{}',
  is_system TINYINT(1) NOT NULL DEFAULT false,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_id BIGINT NOT NULL REFERENCES roles(id) ON UPDATE CASCADE,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash TEXT NOT NULL,
  status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  last_login_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE languages (
  id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(80) NOT NULL,
  native_name VARCHAR(80),
  direction VARCHAR(3) NOT NULL DEFAULT 'ltr',
  is_default TINYINT(1) NOT NULL DEFAULT false,
  is_active TINYINT(1) NOT NULL DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT languages_direction_chk CHECK (direction IN ('ltr', 'rtl'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE media_files (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  uploaded_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  kind ENUM('image', 'pdf', 'document', 'video', 'audio', 'archive', 'other') NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  title VARCHAR(180),
  alt_text VARCHAR(255),
  caption TEXT,
  mime_type VARCHAR(120) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  storage_provider VARCHAR(40) NOT NULL DEFAULT 'local',
  storage_key TEXT NOT NULL,
  public_url TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  checksum_sha256 CHAR(64),
  is_public TINYINT(1) NOT NULL DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT media_size_chk CHECK (file_size_bytes >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pages (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  parent_id BIGINT REFERENCES pages(id) ON DELETE SET NULL,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  module_key VARCHAR(80) NOT NULL,
  body LONGTEXT NOT NULL DEFAULT '{}',
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE navigation_items (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  parent_id BIGINT REFERENCES navigation_items(id) ON DELETE CASCADE,
  label VARCHAR(120) NOT NULL,
  url TEXT NOT NULL,
  target VARCHAR(20) NOT NULL DEFAULT '_self',
  icon VARCHAR(80),
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT navigation_target_chk CHECK (target IN ('_self', '_blank'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE seo_metadata (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  page_id BIGINT REFERENCES pages(id) ON DELETE CASCADE,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  entity_type VARCHAR(80),
  entity_id BIGINT,
  meta_title VARCHAR(180) NOT NULL,
  meta_description VARCHAR(320),
  meta_keywords TEXT,
  canonical_url TEXT,
  og_title VARCHAR(180),
  og_description VARCHAR(320),
  og_image_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  robots VARCHAR(80) NOT NULL DEFAULT 'index,follow',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE site_settings (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  setting_key VARCHAR(120) NOT NULL,
  setting_value LONGTEXT NOT NULL,
  description TEXT,
  is_public TINYINT(1) NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE accessibility_settings (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  setting_key VARCHAR(120) NOT NULL,
  setting_value LONGTEXT NOT NULL,
  is_enabled TINYINT(1) NOT NULL DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hero_section (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  subtitle TEXT,
  background_image_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  cta_text VARCHAR(120),
  cta_link TEXT,
  secondary_cta_text VARCHAR(120),
  secondary_cta_link TEXT,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE homepage_sections (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  section_key VARCHAR(100) NOT NULL,
  title VARCHAR(180) NOT NULL,
  subtitle TEXT,
  content LONGTEXT NOT NULL DEFAULT '{}',
  background_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, section_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE homepage_cards (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  section_id BIGINT NOT NULL REFERENCES homepage_sections(id) ON DELETE CASCADE,
  card_title VARCHAR(160) NOT NULL,
  description TEXT,
  icon VARCHAR(80),
  icon_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  destination_link TEXT,
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE schools (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  short_description TEXT,
  description TEXT,
  dean_faculty_id BIGINT,
  office_email VARCHAR(255),
  office_phone VARCHAR(40),
  sort_order INTEGER NOT NULL DEFAULT 0,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE departments (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE RESTRICT,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT,
  vision TEXT,
  mission TEXT,
  hod_faculty_id BIGINT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(40),
  office_location VARCHAR(180),
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE programs (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  department_id BIGINT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  level ENUM('certificate', 'diploma', 'undergraduate', 'postgraduate', 'doctoral', 'post_doctoral') NOT NULL,
  duration_text VARCHAR(80),
  intake_capacity INTEGER,
  eligibility TEXT,
  description TEXT,
  fee_summary LONGTEXT NOT NULL DEFAULT '{}',
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE courses (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  code VARCHAR(40) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  credits NUMERIC(4,2),
  course_type VARCHAR(80),
  syllabus_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE program_courses (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  program_id BIGINT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  semester INTEGER NOT NULL,
  year_no INTEGER,
  is_core TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(program_id, course_id, semester),
  CONSTRAINT program_courses_semester_chk CHECK (semester > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE faculty (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  department_id BIGINT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  employee_code VARCHAR(60),
  faculty_name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  designation VARCHAR(140) NOT NULL,
  qualification TEXT,
  research_interest TEXT,
  email VARCHAR(255),
  phone VARCHAR(40),
  photo_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  profile_pdf_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  office_location VARCHAR(180),
  display_order INTEGER NOT NULL DEFAULT 0,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug),
  UNIQUE(employee_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE schools ADD CONSTRAINT schools_dean_fk FOREIGN KEY (dean_faculty_id) REFERENCES faculty(id) ON DELETE SET NULL;

ALTER TABLE departments ADD CONSTRAINT departments_hod_fk FOREIGN KEY (hod_faculty_id) REFERENCES faculty(id) ON DELETE SET NULL;

CREATE TABLE administration (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(180) NOT NULL,
  designation VARCHAR(160) NOT NULL,
  message TEXT,
  profile_photo_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  email VARCHAR(255),
  phone VARCHAR(40),
  office_location VARCHAR(180),
  sort_order INTEGER NOT NULL DEFAULT 0,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admissions (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  description TEXT,
  eligibility TEXT,
  application_start_date DATE,
  application_end_date DATE,
  brochure_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  apply_url TEXT,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  priority_level SMALLINT NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_services (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT,
  service_url TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  icon VARCHAR(80),
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE notices (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(240) NOT NULL,
  slug VARCHAR(240) NOT NULL,
  body TEXT,
  pdf_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  category ENUM('general', 'admission', 'examination', 'academic', 'recruitment', 'tender', 'student', 'event') NOT NULL DEFAULT 'general',
  publish_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiry_date DATETIME,
  priority_level SMALLINT NOT NULL DEFAULT 0,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE announcements (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  summary TEXT,
  link_url TEXT,
  publish_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiry_date DATETIME,
  priority_level SMALLINT NOT NULL DEFAULT 0,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE events (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  description TEXT,
  venue VARCHAR(220),
  start_at DATETIME NOT NULL,
  end_at DATETIME,
  registration_url TEXT,
  cover_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gallery_categories (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(140) NOT NULL,
  slug VARCHAR(140) NOT NULL,
  description TEXT,
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gallery (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  category_id BIGINT REFERENCES gallery_categories(id) ON DELETE SET NULL,
  media_id BIGINT NOT NULL REFERENCES media_files(id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  event_name VARCHAR(180),
  description TEXT,
  upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_featured TINYINT(1) NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE research_projects (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  principal_investigator_id BIGINT REFERENCES faculty(id) ON DELETE SET NULL,
  title VARCHAR(260) NOT NULL,
  funding_agency VARCHAR(180),
  grant_amount NUMERIC(14,2),
  start_date DATE,
  end_date DATE,
  summary TEXT,
  outcome TEXT,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE publications (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  faculty_id BIGINT REFERENCES faculty(id) ON DELETE SET NULL,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  title VARCHAR(300) NOT NULL,
  publication_type VARCHAR(80) NOT NULL,
  authors TEXT NOT NULL,
  journal_or_publisher VARCHAR(220),
  publication_year INTEGER,
  doi VARCHAR(160),
  url TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE recruitment (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(240) NOT NULL,
  slug VARCHAR(240) NOT NULL,
  post_name VARCHAR(180),
  advertisement_no VARCHAR(80),
  description TEXT,
  opening_date DATE,
  closing_date DATE,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  apply_url TEXT,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tenders (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(240) NOT NULL,
  slug VARCHAR(240) NOT NULL,
  tender_no VARCHAR(100),
  description TEXT,
  opening_date DATE,
  closing_date DATE,
  estimated_value NUMERIC(14,2),
  emd_amount NUMERIC(14,2),
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE documents (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  file_media_id BIGINT NOT NULL REFERENCES media_files(id) ON DELETE RESTRICT,
  publish_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  download_count BIGINT NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug),
  CONSTRAINT documents_download_count_chk CHECK (download_count >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE students (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  registration_no VARCHAR(80) NOT NULL UNIQUE,
  roll_no VARCHAR(80) UNIQUE,
  full_name VARCHAR(180) NOT NULL,
  email VARCHAR(255),
  academic_year VARCHAR(20),
  enrollment_status VARCHAR(40) NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE results (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  student_id BIGINT REFERENCES students(id) ON DELETE SET NULL,
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  title VARCHAR(220) NOT NULL,
  exam_session VARCHAR(80) NOT NULL,
  semester INTEGER,
  result_type VARCHAR(80) NOT NULL,
  marks LONGTEXT,
  grade VARCHAR(20),
  result_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  publish_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hostels (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT,
  capacity INTEGER,
  warden_name VARCHAR(180),
  warden_email VARCHAR(255),
  warden_phone VARCHAR(40),
  location VARCHAR(220),
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hostel_rooms (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hostel_id BIGINT NOT NULL REFERENCES hostels(id) ON DELETE CASCADE,
  room_no VARCHAR(40) NOT NULL,
  capacity INTEGER NOT NULL,
  occupancy INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(hostel_id, room_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hostel_notices (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hostel_id BIGINT NOT NULL REFERENCES hostels(id) ON DELETE CASCADE,
  notice_id BIGINT NOT NULL REFERENCES notices(id) ON DELETE CASCADE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(hostel_id, notice_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE library_resources (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  description TEXT,
  access_url TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE scholarships (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  provider VARCHAR(180),
  eligibility TEXT,
  amount_text VARCHAR(140),
  application_deadline DATE,
  apply_url TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE placements (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  recruiter_name VARCHAR(180),
  package_lpa NUMERIC(8,2),
  placement_year INTEGER,
  description TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contact_information (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  label VARCHAR(140) NOT NULL,
  address TEXT,
  phone VARCHAR(80),
  email VARCHAR(255),
  office_hours VARCHAR(180),
  map_embed_url TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  is_primary TINYINT(1) NOT NULL DEFAULT false,
  is_active TINYINT(1) NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE footer_link_groups (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(120) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE footer_links (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  group_id BIGINT NOT NULL REFERENCES footer_link_groups(id) ON DELETE CASCADE,
  label VARCHAR(140) NOT NULL,
  url TEXT NOT NULL,
  target VARCHAR(20) NOT NULL DEFAULT '_self',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT footer_target_chk CHECK (target IN ('_self', '_blank'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE audit_logs (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  actor_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(80) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id BIGINT,
  before_data LONGTEXT,
  after_data LONGTEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_users_role ON users(role_id);

CREATE INDEX idx_media_uploaded_by ON media_files(uploaded_by);

CREATE INDEX idx_media_kind_public ON media_files(kind, is_public);

CREATE INDEX idx_pages_parent ON pages(parent_id);

CREATE INDEX idx_pages_module_status ON pages(module_key, status, is_active);

CREATE INDEX idx_navigation_parent_order ON navigation_items(parent_id, is_active, sort_order);

CREATE INDEX idx_seo_page ON seo_metadata(page_id);

CREATE INDEX idx_seo_entity ON seo_metadata(entity_type, entity_id);

CREATE INDEX idx_site_settings_public ON site_settings(is_public);

CREATE INDEX idx_hero_active_order ON hero_section(language_id, is_active, status, sort_order);

CREATE INDEX idx_homepage_sections_active_order ON homepage_sections(language_id, is_active, status, sort_order);

CREATE INDEX idx_homepage_cards_section_order ON homepage_cards(section_id, is_active, sort_order);

CREATE INDEX idx_schools_active_order ON schools(language_id, is_active, status, sort_order);

CREATE INDEX idx_departments_school ON departments(school_id);

CREATE INDEX idx_departments_active_order ON departments(language_id, is_active, status, sort_order);

CREATE INDEX idx_programs_department ON programs(department_id);

CREATE INDEX idx_programs_level ON programs(level);

CREATE INDEX idx_courses_status ON courses(status);

CREATE INDEX idx_program_courses_program_semester ON program_courses(program_id, semester, sort_order);

CREATE INDEX idx_faculty_department_order ON faculty(department_id, is_active, display_order);

CREATE INDEX idx_faculty_email ON faculty(email);

CREATE INDEX idx_administration_order ON administration(language_id, is_active, status, sort_order);

CREATE INDEX idx_admissions_year_status ON admissions(academic_year, status, priority_level);

CREATE INDEX idx_student_services_order ON student_services(language_id, is_active, status, sort_order);

CREATE INDEX idx_notices_category_publish ON notices(category, status, publish_date DESC);

CREATE INDEX idx_notices_priority ON notices(priority_level DESC, publish_date DESC);

CREATE INDEX idx_announcements_publish ON announcements(status, publish_date DESC);

CREATE INDEX idx_events_dates ON events(status, start_at, end_at);

CREATE INDEX idx_gallery_category ON gallery(category_id, status, sort_order);

CREATE INDEX idx_gallery_featured ON gallery(is_featured, status, upload_date DESC);

CREATE INDEX idx_research_department ON research_projects(department_id, status);

CREATE INDEX idx_research_pi ON research_projects(principal_investigator_id);

CREATE INDEX idx_publications_faculty_year ON publications(faculty_id, publication_year DESC);

CREATE INDEX idx_recruitment_dates ON recruitment(status, closing_date DESC);

CREATE INDEX idx_tenders_dates ON tenders(status, closing_date DESC);

CREATE INDEX idx_documents_category_publish ON documents(category, status, publish_date DESC);

CREATE INDEX idx_students_program ON students(program_id);

CREATE INDEX idx_students_department ON students(department_id);

CREATE INDEX idx_students_roll ON students(roll_no);

CREATE INDEX idx_results_student_session ON results(student_id, exam_session);

CREATE INDEX idx_results_program_session ON results(program_id, exam_session, semester);

CREATE INDEX idx_hostel_rooms_hostel ON hostel_rooms(hostel_id);

CREATE INDEX idx_library_type_order ON library_resources(resource_type, is_active, sort_order);

CREATE INDEX idx_scholarships_deadline ON scholarships(status, application_deadline);

CREATE INDEX idx_placements_department_year ON placements(department_id, placement_year DESC);

CREATE INDEX idx_contact_primary ON contact_information(language_id, is_primary, is_active);

CREATE INDEX idx_footer_groups_order ON footer_link_groups(language_id, is_active, sort_order);

CREATE INDEX idx_footer_links_order ON footer_links(group_id, is_active, sort_order);

CREATE INDEX idx_audit_actor_time ON audit_logs(actor_user_id, created_at DESC);

CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
SET FOREIGN_KEY_CHECKS=1;
