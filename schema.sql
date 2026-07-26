CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE notice_category AS ENUM ('general', 'admission', 'examination', 'academic', 'recruitment', 'tender', 'student', 'event');
CREATE TYPE media_kind AS ENUM ('image', 'pdf', 'document', 'video', 'audio', 'archive', 'other');
CREATE TYPE program_level AS ENUM ('certificate', 'diploma', 'undergraduate', 'postgraduate', 'doctoral', 'post_doctoral');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');

CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_system BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  role_id BIGINT NOT NULL REFERENCES roles(id) ON UPDATE CASCADE,
  full_name VARCHAR(160) NOT NULL,
  email CITEXT NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash TEXT NOT NULL,
  status user_status NOT NULL DEFAULT 'active',
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT users_email_format_chk CHECK (email::text ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

CREATE TABLE languages (
  id SMALLSERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(80) NOT NULL,
  native_name VARCHAR(80),
  direction VARCHAR(3) NOT NULL DEFAULT 'ltr',
  is_default BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT languages_direction_chk CHECK (direction IN ('ltr', 'rtl'))
);

CREATE UNIQUE INDEX uq_languages_default_one ON languages(is_default) WHERE is_default;

CREATE TABLE media_files (
  id BIGSERIAL PRIMARY KEY,
  uploaded_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  kind media_kind NOT NULL,
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
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT media_size_chk CHECK (file_size_bytes >= 0),
  CONSTRAINT media_dimensions_chk CHECK ((width IS NULL OR width > 0) AND (height IS NULL OR height > 0))
);

CREATE TABLE pages (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  parent_id BIGINT REFERENCES pages(id) ON DELETE SET NULL,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  module_key VARCHAR(80) NOT NULL,
  body JSONB NOT NULL DEFAULT '{}'::jsonb,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug)
);

CREATE TABLE navigation_items (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  parent_id BIGINT REFERENCES navigation_items(id) ON DELETE CASCADE,
  label VARCHAR(120) NOT NULL,
  url TEXT NOT NULL,
  target VARCHAR(20) NOT NULL DEFAULT '_self',
  icon VARCHAR(80),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT navigation_target_chk CHECK (target IN ('_self', '_blank'))
);

CREATE TABLE seo_metadata (
  id BIGSERIAL PRIMARY KEY,
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT seo_page_or_entity_chk CHECK (page_id IS NOT NULL OR (entity_type IS NOT NULL AND entity_id IS NOT NULL))
);

CREATE TABLE site_settings (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  setting_key VARCHAR(120) NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, setting_key)
);

CREATE TABLE accessibility_settings (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  setting_key VARCHAR(120) NOT NULL,
  setting_value JSONB NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, setting_key)
);

CREATE TABLE hero_section (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  subtitle TEXT,
  background_image_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  cta_text VARCHAR(120),
  cta_link TEXT,
  secondary_cta_text VARCHAR(120),
  secondary_cta_link TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE homepage_sections (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  section_key VARCHAR(100) NOT NULL,
  title VARCHAR(180) NOT NULL,
  subtitle TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  background_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, section_key)
);

CREATE TABLE homepage_cards (
  id BIGSERIAL PRIMARY KEY,
  section_id BIGINT NOT NULL REFERENCES homepage_sections(id) ON DELETE CASCADE,
  card_title VARCHAR(160) NOT NULL,
  description TEXT,
  icon VARCHAR(80),
  icon_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  destination_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE schools (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  short_description TEXT,
  description TEXT,
  dean_faculty_id BIGINT,
  office_email CITEXT,
  office_phone VARCHAR(40),
  sort_order INTEGER NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug)
);

CREATE TABLE departments (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE RESTRICT,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT,
  vision TEXT,
  mission TEXT,
  hod_faculty_id BIGINT,
  contact_email CITEXT,
  contact_phone VARCHAR(40),
  office_location VARCHAR(180),
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug)
);

CREATE TABLE programs (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  department_id BIGINT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  level program_level NOT NULL,
  duration_text VARCHAR(80),
  intake_capacity INTEGER,
  eligibility TEXT,
  description TEXT,
  fee_summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT programs_intake_chk CHECK (intake_capacity IS NULL OR intake_capacity >= 0)
);

CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  code VARCHAR(40) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  credits NUMERIC(4,2),
  course_type VARCHAR(80),
  syllabus_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, code),
  CONSTRAINT courses_credits_chk CHECK (credits IS NULL OR credits >= 0)
);

CREATE TABLE program_courses (
  id BIGSERIAL PRIMARY KEY,
  program_id BIGINT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  semester INTEGER NOT NULL,
  year_no INTEGER,
  is_core BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(program_id, course_id, semester),
  CONSTRAINT program_courses_semester_chk CHECK (semester > 0)
);

CREATE TABLE faculty (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  department_id BIGINT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  employee_code VARCHAR(60),
  faculty_name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  designation VARCHAR(140) NOT NULL,
  qualification TEXT,
  research_interest TEXT,
  email CITEXT,
  phone VARCHAR(40),
  photo_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  profile_pdf_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  office_location VARCHAR(180),
  display_order INTEGER NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  UNIQUE(employee_code)
);

ALTER TABLE schools ADD CONSTRAINT schools_dean_fk FOREIGN KEY (dean_faculty_id) REFERENCES faculty(id) ON DELETE SET NULL;
ALTER TABLE departments ADD CONSTRAINT departments_hod_fk FOREIGN KEY (hod_faculty_id) REFERENCES faculty(id) ON DELETE SET NULL;

CREATE TABLE administration (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(180) NOT NULL,
  designation VARCHAR(160) NOT NULL,
  message TEXT,
  profile_photo_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  email CITEXT,
  phone VARCHAR(40),
  office_location VARCHAR(180),
  sort_order INTEGER NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE admissions (
  id BIGSERIAL PRIMARY KEY,
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
  status content_status NOT NULL DEFAULT 'draft',
  priority_level SMALLINT NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT admissions_date_chk CHECK (application_end_date IS NULL OR application_start_date IS NULL OR application_end_date >= application_start_date)
);

CREATE TABLE student_services (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT,
  service_url TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  icon VARCHAR(80),
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug)
);

CREATE TABLE notices (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(240) NOT NULL,
  slug VARCHAR(240) NOT NULL,
  body TEXT,
  pdf_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  category notice_category NOT NULL DEFAULT 'general',
  publish_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expiry_date TIMESTAMPTZ,
  priority_level SMALLINT NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT notices_date_chk CHECK (expiry_date IS NULL OR expiry_date >= publish_date)
);

CREATE TABLE announcements (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  summary TEXT,
  link_url TEXT,
  publish_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expiry_date TIMESTAMPTZ,
  priority_level SMALLINT NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT announcements_date_chk CHECK (expiry_date IS NULL OR expiry_date >= publish_date)
);

CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  description TEXT,
  venue VARCHAR(220),
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  registration_url TEXT,
  cover_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT events_date_chk CHECK (end_at IS NULL OR end_at >= start_at)
);

CREATE TABLE gallery_categories (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(140) NOT NULL,
  slug VARCHAR(140) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug)
);

CREATE TABLE gallery (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  category_id BIGINT REFERENCES gallery_categories(id) ON DELETE SET NULL,
  media_id BIGINT NOT NULL REFERENCES media_files(id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  event_name VARCHAR(180),
  description TEXT,
  upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status content_status NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE research_projects (
  id BIGSERIAL PRIMARY KEY,
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
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT research_dates_chk CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
  CONSTRAINT research_grant_chk CHECK (grant_amount IS NULL OR grant_amount >= 0)
);

CREATE TABLE publications (
  id BIGSERIAL PRIMARY KEY,
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
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT publications_year_chk CHECK (publication_year IS NULL OR publication_year BETWEEN 1900 AND 2200)
);

CREATE TABLE recruitment (
  id BIGSERIAL PRIMARY KEY,
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
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT recruitment_dates_chk CHECK (closing_date IS NULL OR opening_date IS NULL OR closing_date >= opening_date)
);

CREATE TABLE tenders (
  id BIGSERIAL PRIMARY KEY,
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
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT tenders_dates_chk CHECK (closing_date IS NULL OR opening_date IS NULL OR closing_date >= opening_date),
  CONSTRAINT tenders_money_chk CHECK ((estimated_value IS NULL OR estimated_value >= 0) AND (emd_amount IS NULL OR emd_amount >= 0))
);

CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  file_media_id BIGINT NOT NULL REFERENCES media_files(id) ON DELETE RESTRICT,
  publish_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  status content_status NOT NULL DEFAULT 'draft',
  download_count BIGINT NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT documents_download_count_chk CHECK (download_count >= 0)
);

CREATE TABLE students (
  id BIGSERIAL PRIMARY KEY,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  registration_no VARCHAR(80) NOT NULL UNIQUE,
  roll_no VARCHAR(80) UNIQUE,
  full_name VARCHAR(180) NOT NULL,
  email CITEXT,
  academic_year VARCHAR(20),
  enrollment_status VARCHAR(40) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE results (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  student_id BIGINT REFERENCES students(id) ON DELETE SET NULL,
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  title VARCHAR(220) NOT NULL,
  exam_session VARCHAR(80) NOT NULL,
  semester INTEGER,
  result_type VARCHAR(80) NOT NULL,
  marks JSONB,
  grade VARCHAR(20),
  result_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  publish_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT results_semester_chk CHECK (semester IS NULL OR semester > 0)
);

CREATE TABLE hostels (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT,
  capacity INTEGER,
  warden_name VARCHAR(180),
  warden_email CITEXT,
  warden_phone VARCHAR(40),
  location VARCHAR(220),
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT hostels_capacity_chk CHECK (capacity IS NULL OR capacity >= 0)
);

CREATE TABLE hostel_rooms (
  id BIGSERIAL PRIMARY KEY,
  hostel_id BIGINT NOT NULL REFERENCES hostels(id) ON DELETE CASCADE,
  room_no VARCHAR(40) NOT NULL,
  capacity INTEGER NOT NULL,
  occupancy INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(hostel_id, room_no),
  CONSTRAINT hostel_rooms_capacity_chk CHECK (capacity > 0 AND occupancy >= 0 AND occupancy <= capacity)
);

CREATE TABLE hostel_notices (
  id BIGSERIAL PRIMARY KEY,
  hostel_id BIGINT NOT NULL REFERENCES hostels(id) ON DELETE CASCADE,
  notice_id BIGINT NOT NULL REFERENCES notices(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(hostel_id, notice_id)
);

CREATE TABLE library_resources (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  description TEXT,
  access_url TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug)
);

CREATE TABLE scholarships (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  provider VARCHAR(180),
  eligibility TEXT,
  amount_text VARCHAR(140),
  application_deadline DATE,
  apply_url TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug)
);

CREATE TABLE placements (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL,
  recruiter_name VARCHAR(180),
  package_lpa NUMERIC(8,2),
  placement_year INTEGER,
  description TEXT,
  document_media_id BIGINT REFERENCES media_files(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(language_id, slug),
  CONSTRAINT placements_package_chk CHECK (package_lpa IS NULL OR package_lpa >= 0),
  CONSTRAINT placements_year_chk CHECK (placement_year IS NULL OR placement_year BETWEEN 2000 AND 2200)
);

CREATE TABLE contact_information (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  label VARCHAR(140) NOT NULL,
  address TEXT,
  phone VARCHAR(80),
  email CITEXT,
  office_hours VARCHAR(180),
  map_embed_url TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  is_primary BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE footer_link_groups (
  id BIGSERIAL PRIMARY KEY,
  language_id SMALLINT NOT NULL REFERENCES languages(id),
  title VARCHAR(120) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE footer_links (
  id BIGSERIAL PRIMARY KEY,
  group_id BIGINT NOT NULL REFERENCES footer_link_groups(id) ON DELETE CASCADE,
  label VARCHAR(140) NOT NULL,
  url TEXT NOT NULL,
  target VARCHAR(20) NOT NULL DEFAULT '_self',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT footer_target_chk CHECK (target IN ('_self', '_blank'))
);

CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(80) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id BIGINT,
  before_data JSONB,
  after_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

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

CREATE INDEX idx_departments_search ON departments USING gin(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '')));
CREATE INDEX idx_programs_search ON programs USING gin(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(eligibility, '')));
CREATE INDEX idx_faculty_search ON faculty USING gin(to_tsvector('english', faculty_name || ' ' || designation || ' ' || coalesce(research_interest, '') || ' ' || coalesce(qualification, '')));
CREATE INDEX idx_notices_search ON notices USING gin(to_tsvector('english', title || ' ' || coalesce(body, '')));
CREATE INDEX idx_events_search ON events USING gin(to_tsvector('english', title || ' ' || coalesce(description, '') || ' ' || coalesce(venue, '')));
CREATE INDEX idx_documents_search ON documents USING gin(to_tsvector('english', title || ' ' || category || ' ' || coalesce(description, '')));

CREATE TRIGGER trg_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_languages_updated_at BEFORE UPDATE ON languages FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_media_files_updated_at BEFORE UPDATE ON media_files FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_navigation_items_updated_at BEFORE UPDATE ON navigation_items FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_accessibility_settings_updated_at BEFORE UPDATE ON accessibility_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_hero_section_updated_at BEFORE UPDATE ON hero_section FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_homepage_sections_updated_at BEFORE UPDATE ON homepage_sections FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_homepage_cards_updated_at BEFORE UPDATE ON homepage_cards FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_program_courses_updated_at BEFORE UPDATE ON program_courses FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_faculty_updated_at BEFORE UPDATE ON faculty FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_administration_updated_at BEFORE UPDATE ON administration FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_admissions_updated_at BEFORE UPDATE ON admissions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_student_services_updated_at BEFORE UPDATE ON student_services FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_notices_updated_at BEFORE UPDATE ON notices FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_gallery_categories_updated_at BEFORE UPDATE ON gallery_categories FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_gallery_updated_at BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_research_projects_updated_at BEFORE UPDATE ON research_projects FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_recruitment_updated_at BEFORE UPDATE ON recruitment FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_tenders_updated_at BEFORE UPDATE ON tenders FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_results_updated_at BEFORE UPDATE ON results FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_hostels_updated_at BEFORE UPDATE ON hostels FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_hostel_rooms_updated_at BEFORE UPDATE ON hostel_rooms FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_library_resources_updated_at BEFORE UPDATE ON library_resources FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_scholarships_updated_at BEFORE UPDATE ON scholarships FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_placements_updated_at BEFORE UPDATE ON placements FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_contact_information_updated_at BEFORE UPDATE ON contact_information FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_footer_link_groups_updated_at BEFORE UPDATE ON footer_link_groups FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_footer_links_updated_at BEFORE UPDATE ON footer_links FOR EACH ROW EXECUTE FUNCTION set_updated_at();
