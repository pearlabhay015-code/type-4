<?php
declare(strict_types=1);

/* CUSB CMS API: intended for Apache/PHP in XAMPP. */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, private');

// Allow only the configured public site and local preview to call this API.
$origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
$allowedOrigins = array_filter(array_map('trim', explode(',', (string)(getenv('CORS_ALLOWED_ORIGINS') ?: ''))));
$allowedOrigins = array_merge($allowedOrigins, ['http://localhost:8000', 'http://127.0.0.1:8000']);
if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Session-Token');
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

const SESSION_TTL = 3600;

function config(string $key, string $default): string {
    $value = getenv($key);
    return is_string($value) && $value !== '' ? $value : $default;
}

function respond(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function db(): PDO {
    static $connection = null;
    if ($connection instanceof PDO) return $connection;
    try {
        $connection = new PDO(
            'mysql:host=' . config('DB_HOST', '127.0.0.1') . ';port=' . config('DB_PORT', '3306') . ';dbname=' . config('DB_NAME', 'cusb_website') . ';charset=utf8mb4',
            config('DB_USER', 'cusb_cms'),
            config('DB_PASSWORD', 'change-this-before-going-live'),
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
        return $connection;
    } catch (PDOException) {
        respond(503, ['error' => 'The CMS database is unavailable. Check api/index.php database settings.']);
    }
}

function tableExists(string $table): bool {
    static $known = [];
    if (array_key_exists($table, $known)) return $known[$table];
    $stmt = db()->prepare('SHOW TABLES LIKE ?');
    $stmt->execute([$table]);
    return $known[$table] = (bool)$stmt->fetchColumn();
}

function legacyAnnouncementPayload(array $row): array {
    return [
        'id' => (int)$row['id'], 'title_en' => $row['title'], 'title_hi' => $row['title'],
        'desc_en' => $row['summary'] ?? '', 'desc_hi' => $row['summary'] ?? '', 'type' => 'notice',
        'image_url' => null, 'date_str' => $row['publish_date'] ?? '', 'created_at' => $row['created_at'] ?? ''
    ];
}

function input(): array {
    $body = file_get_contents('php://input');
    $data = json_decode($body ?: '{}', true);
    return is_array($data) ? $data : [];
}

function text(array $data, string $key): string {
    return trim((string)($data[$key] ?? ''));
}

function token(): string {
    return bin2hex(random_bytes(32));
}

function currentUser(): ?array {
    $sessionToken = $_SERVER['HTTP_X_SESSION_TOKEN'] ?? ($_COOKIE['cusb_session'] ?? '');
    if (!is_string($sessionToken) || !preg_match('/^[a-f0-9]{64}$/', $sessionToken)) return null;
    $stmt = db()->prepare('SELECT s.token, u.id, u.username FROM cms_sessions s JOIN cms_admin_users u ON u.id = s.user_id WHERE s.token = ? AND s.expires_at > UTC_TIMESTAMP() AND u.is_active = 1');
    $stmt->execute([$sessionToken]);
    return $stmt->fetch() ?: null;
}

function requireUser(): array {
    $user = currentUser();
    if (!$user) respond(401, ['error' => 'Please sign in again.']);
    return $user;
}

function audit(int $userId, string $action): void {
    $stmt = db()->prepare('INSERT INTO cms_audit_logs (user_id, action, ip_address) VALUES (?, ?, ?)');
    $stmt->execute([$userId, $action, substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45)]);
}

function setSessionCookie(string $sessionToken): void {
    setcookie('cusb_session', $sessionToken, [
        'expires' => time() + SESSION_TTL,
        'path' => '/',
        'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
        'httponly' => true,
        'samesite' => 'Strict'
    ]);
}

function announcementPayload(array $row): array {
    return [
        'id' => (int)$row['id'], 'title_en' => $row['title_en'], 'title_hi' => $row['title_hi'],
        'desc_en' => $row['desc_en'], 'desc_hi' => $row['desc_hi'], 'type' => $row['type'],
        'image_url' => $row['image_url'], 'date_str' => $row['date_str'], 'created_at' => $row['created_at']
    ];
}

function galleryPayload(array $row): array {
    return ['id' => (int)$row['id'], 'title_en' => $row['title_en'], 'title_hi' => $row['title_hi'], 'image_url' => $row['image_url'], 'created_at' => $row['created_at']];
}

function publicCode(string $prefix): string {
    return $prefix . '-' . gmdate('Y') . '-' . strtoupper(bin2hex(random_bytes(4)));
}

function requiredText(array $data, string $key, int $maxLength = 1000): string {
    $value = text($data, $key);
    if ($value === '' || mb_strlen($value) > $maxLength) respond(400, ['error' => "Invalid {$key}."]);
    return $value;
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$apiPosition = strpos($path, '/api/');
$route = $apiPosition === false ? '/' : substr($path, $apiPosition + 5);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET' && $route === 'setup-status') {
    respond(200, ['setup_required' => (int)db()->query('SELECT COUNT(*) FROM cms_admin_users')->fetchColumn() === 0]);
}
if ($method === 'GET' && $route === 'check-session') {
    $user = currentUser();
    respond(200, ['authenticated' => (bool)$user, 'username' => $user['username'] ?? null]);
}
if ($method === 'POST' && $route === 'register') {
    if ((int)db()->query('SELECT COUNT(*) FROM cms_admin_users')->fetchColumn() > 0) respond(403, ['error' => 'Administrator setup is already complete.']);
    $data = input(); $username = text($data, 'username'); $password = (string)($data['password'] ?? '');
    if (!preg_match('/^[A-Za-z0-9_.-]{3,80}$/', $username) || strlen($password) < 10) respond(400, ['error' => 'Use a 3+ character username and a password with at least 10 characters.']);
    $stmt = db()->prepare('INSERT INTO cms_admin_users (username, password_hash) VALUES (?, ?)');
    try { $stmt->execute([$username, password_hash($password, PASSWORD_DEFAULT)]); } catch (PDOException) { respond(409, ['error' => 'That username is already in use.']); }
    $userId = (int)db()->lastInsertId(); $sessionToken = token();
    db()->prepare('INSERT INTO cms_sessions (token, user_id, expires_at) VALUES (?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL 1 HOUR))')->execute([$sessionToken, $userId]);
    audit($userId, 'Completed initial administrator setup'); setSessionCookie($sessionToken);
    respond(200, ['success' => true, 'token' => $sessionToken, 'username' => $username]);
}
if ($method === 'POST' && $route === 'login') {
    $data = input(); $username = text($data, 'username'); $password = (string)($data['password'] ?? '');
    $stmt = db()->prepare('SELECT id, username, password_hash FROM cms_admin_users WHERE username = ? AND is_active = 1'); $stmt->execute([$username]); $user = $stmt->fetch();
    if (!$user || !password_verify($password, $user['password_hash'])) respond(401, ['error' => 'Invalid username or password.']);
    $sessionToken = token(); db()->prepare('INSERT INTO cms_sessions (token, user_id, expires_at) VALUES (?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL 1 HOUR))')->execute([$sessionToken, $user['id']]);
    audit((int)$user['id'], 'Signed in'); setSessionCookie($sessionToken);
    respond(200, ['success' => true, 'token' => $sessionToken, 'username' => $user['username']]);
}
if ($method === 'POST' && $route === 'logout') {
    $user = requireUser(); $sessionToken = $_SERVER['HTTP_X_SESSION_TOKEN'] ?? ($_COOKIE['cusb_session'] ?? '');
    db()->prepare('DELETE FROM cms_sessions WHERE token = ?')->execute([$sessionToken]); audit((int)$user['id'], 'Signed out');
    setcookie('cusb_session', '', time() - 3600, '/'); respond(200, ['success' => true]);
}
if ($method === 'GET' && $route === 'announcements') {
    $showAll = ($_GET['show_all'] ?? '') === 'true'; $type = strtolower(trim((string)($_GET['type'] ?? '')));
    $sql = 'SELECT id,title_en,title_hi,desc_en,desc_hi,type,image_url,date_str,created_at FROM cms_announcements WHERE 1=1'; $values = [];
    if (!$showAll) $sql .= " AND status = 'published'";
    if ($type !== '') { $sql .= ' AND type = ?'; $values[] = $type; }
    $sql .= ' ORDER BY published_at DESC, id DESC'; $stmt = db()->prepare($sql); $stmt->execute($values);
    $records = $stmt->fetchAll();
    if (!$records && tableExists('announcements')) {
        $legacySql = "SELECT id,title,summary,publish_date,created_at FROM announcements WHERE status='published' ORDER BY publish_date DESC, id DESC";
        $records = db()->query($legacySql)->fetchAll();
        respond(200, array_map('legacyAnnouncementPayload', $records));
    }
    respond(200, array_map('announcementPayload', $records));
}
if ($method === 'GET' && $route === 'homepage-stats') {
    if (!tableExists('cms_homepage_stats')) respond(404, ['error' => 'Homepage statistics have not been configured.']);
    $stmt = db()->prepare('SELECT stats_json, updated_at FROM cms_homepage_stats WHERE stat_key = ?');
    $stmt->execute(['homepage_dashboard']);
    $record = $stmt->fetch();
    if (!$record) respond(404, ['error' => 'Homepage statistics have not been configured.']);
    $stats = json_decode((string)$record['stats_json'], true);
    if (!is_array($stats)) respond(500, ['error' => 'Homepage statistics contain invalid JSON.']);
    $stats['updated_at'] = $record['updated_at'];
    respond(200, $stats);
}
if ($method === 'GET' && $route === 'gallery') {
    $stmt = db()->query("SELECT id,title_en,title_hi,image_url,created_at FROM cms_gallery WHERE status = 'published' ORDER BY sort_order, id DESC");
    respond(200, array_map('galleryPayload', $stmt->fetchAll()));
}
if ($method === 'GET' && $route === 'admissions') {
    $stmt = db()->query("SELECT id,title,academic_year,programme_level,description,eligibility,application_start_date,application_end_date,brochure_url,apply_url FROM cms_admission_notices WHERE status='published' ORDER BY application_end_date IS NULL, application_end_date ASC, id DESC");
    $records = $stmt->fetchAll();
    if (!$records && tableExists('admissions')) {
        $records = db()->query("SELECT id,title,academic_year,'all' AS programme_level,description,eligibility,application_start_date,application_end_date,NULL AS brochure_url,apply_url FROM admissions WHERE status='published' ORDER BY priority_level DESC, application_end_date IS NULL, application_end_date ASC, id DESC")->fetchAll();
    }
    respond(200, $records);
}
if ($method === 'GET' && $route === 'departments') {
    $slug = trim((string)($_GET['dept'] ?? ''));
    if ($slug === '' || !tableExists('departments')) respond(404, ['error' => 'Department profile not found.']);
    $stmt = db()->prepare("SELECT d.id,d.name,d.slug,d.description,d.vision,d.mission,d.office_location,d.updated_at,s.name AS school FROM departments d LEFT JOIN schools s ON s.id=d.school_id WHERE d.slug=? AND d.status='published' AND d.is_active=1 LIMIT 1");
    $stmt->execute([$slug]); $department = $stmt->fetch();
    if (!$department) respond(404, ['error' => 'Department profile not found.']);
    $programmes = db()->prepare("SELECT name,level,duration_text AS duration,eligibility AS entrance,description FROM programs WHERE department_id=? AND status='published' AND is_active=1 ORDER BY sort_order,id");
    $programmes->execute([$department['id']]);
    $faculty = db()->prepare("SELECT faculty_name AS name,designation,research_interest AS specialization,email FROM faculty WHERE department_id=? AND status='published' AND is_active=1 ORDER BY display_order,id");
    $faculty->execute([$department['id']]);
    $research = db()->prepare("SELECT title FROM research_projects WHERE department_id=? AND status='published' ORDER BY id DESC LIMIT 12");
    $research->execute([$department['id']]);
    respond(200, [
        'name' => $department['name'], 'school' => $department['school'] ?: 'Central University of South Bihar',
        'summary' => $department['description'] ?: '', 'vision' => $department['vision'] ?: ($department['mission'] ?: ''),
        'established' => $department['office_location'] ?: '', 'updated_at' => $department['updated_at'],
        'programmes' => $programmes->fetchAll(), 'faculty' => $faculty->fetchAll(),
        'research' => array_column($research->fetchAll(), 'title')
    ]);
}
if ($method === 'GET' && $route === 'research') {
    $projects = tableExists('research_projects') ? db()->query("SELECT rp.title,rp.funding_agency,rp.summary,d.slug AS department_slug FROM research_projects rp LEFT JOIN departments d ON d.id=rp.department_id WHERE rp.status='published' ORDER BY rp.id DESC LIMIT 30")->fetchAll() : [];
    $publications = tableExists('publications') ? db()->query("SELECT p.title,p.authors,p.publication_year,p.journal_or_publisher,f.faculty_name AS faculty_name FROM publications p LEFT JOIN faculty f ON f.id=p.faculty_id WHERE p.status='published' ORDER BY p.publication_year DESC,p.id DESC LIMIT 30")->fetchAll() : [];
    respond(200, ['projects' => $projects, 'publications' => $publications]);
}
if ($method === 'GET' && $route === 'recruitment') {
    if (!tableExists('recruitment')) respond(200, []);
    respond(200, db()->query("SELECT r.id,r.title,r.post_name,r.advertisement_no,r.description,r.opening_date,r.closing_date,r.apply_url,r.status,m.public_url AS document_url FROM recruitment r LEFT JOIN media_files m ON m.id=r.document_media_id WHERE r.status IN ('published','archived') ORDER BY r.closing_date IS NULL,r.closing_date DESC,r.id DESC")->fetchAll());
}
if ($method === 'GET' && $route === 'tenders') {
    if (!tableExists('tenders')) respond(200, []);
    respond(200, db()->query("SELECT t.id,t.title,t.tender_no,t.description,t.opening_date,t.closing_date,t.status,m.public_url AS document_url FROM tenders t LEFT JOIN media_files m ON m.id=t.document_media_id WHERE t.status IN ('published','archived') ORDER BY t.closing_date IS NULL,t.closing_date DESC,t.id DESC")->fetchAll());
}
if ($method === 'GET' && $route === 'search') {
    $query = mb_substr(trim((string)($_GET['q'] ?? '')), 0, 120);
    if ($query === '') respond(200, []);
    $like = '%' . $query . '%';
    $pdo = db(); $results = [];
    $stmt = $pdo->prepare("SELECT title,description,url FROM cms_search_index WHERE status='published' AND (title LIKE ? OR description LIKE ? OR keywords LIKE ?) LIMIT 8");
    $stmt->execute([$like, $like, $like]);
    foreach ($stmt->fetchAll() as $row) $results[] = ['title' => $row['title'], 'desc' => $row['description'], 'url' => $row['url']];
    $stmt = $pdo->prepare("SELECT title_en AS title, desc_en AS description, 'news-events.html' AS url FROM cms_announcements WHERE status='published' AND (title_en LIKE ? OR title_hi LIKE ? OR desc_en LIKE ? OR desc_hi LIKE ?) ORDER BY published_at DESC LIMIT 8");
    $stmt->execute([$like, $like, $like, $like]);
    foreach ($stmt->fetchAll() as $row) $results[] = ['title' => $row['title'], 'desc' => $row['description'], 'url' => $row['url']];
    $stmt = $pdo->prepare("SELECT title,description,'admissions.html' AS url FROM cms_admission_notices WHERE status='published' AND (title LIKE ? OR description LIKE ? OR eligibility LIKE ?) LIMIT 8");
    $stmt->execute([$like, $like, $like]);
    foreach ($stmt->fetchAll() as $row) $results[] = ['title' => $row['title'], 'desc' => $row['description'] ?? '', 'url' => $row['url']];
    if (tableExists('departments')) {
        $stmt = $pdo->prepare("SELECT name AS title,description,CONCAT('department.html?dept=',slug) AS url FROM departments WHERE status='published' AND is_active=1 AND (name LIKE ? OR description LIKE ? OR vision LIKE ?) LIMIT 8");
        $stmt->execute([$like, $like, $like]);
        foreach ($stmt->fetchAll() as $row) $results[] = ['title' => $row['title'], 'desc' => $row['description'] ?? '', 'url' => $row['url']];
    }
    if (tableExists('announcements')) {
        $stmt = $pdo->prepare("SELECT title,summary AS description,'news-events.html' AS url FROM announcements WHERE status='published' AND (title LIKE ? OR summary LIKE ?) ORDER BY publish_date DESC LIMIT 8");
        $stmt->execute([$like, $like]);
        foreach ($stmt->fetchAll() as $row) $results[] = ['title' => $row['title'], 'desc' => $row['description'] ?? '', 'url' => $row['url']];
    }
    respond(200, array_slice($results, 0, 12));
}
if ($method === 'GET' && $route === 'chat') {
    $query = mb_substr(mb_strtolower(trim((string)($_GET['q'] ?? ''))), 0, 300);
    if ($query === '') respond(200, ['en' => 'How can I help you with CUSB?', 'hi' => 'मैं CUSB के बारे में आपकी कैसे सहायता कर सकता हूँ?']);
    $answers = db()->query("SELECT keywords,answer_en,answer_hi FROM cms_chatbot_faqs WHERE status='published' ORDER BY id DESC")->fetchAll();
    foreach ($answers as $answer) {
        foreach (explode(',', mb_strtolower($answer['keywords'])) as $keyword) {
            if (($keyword = trim($keyword)) !== '' && str_contains($query, $keyword)) respond(200, ['en' => $answer['answer_en'], 'hi' => $answer['answer_hi'] ?: $answer['answer_en']]);
        }
    }
    $like = '%' . $query . '%';
    $stmt = db()->prepare("SELECT title_en,desc_en,type,date_str FROM cms_announcements WHERE status='published' AND (title_en LIKE ? OR desc_en LIKE ?) ORDER BY published_at DESC LIMIT 1");
    $stmt->execute([$like, $like]); $notice = $stmt->fetch();
    if ($notice) respond(200, ['en' => $notice['title_en'] . ': ' . $notice['desc_en'] . ($notice['date_str'] ? ' (' . $notice['date_str'] . ')' : ''), 'hi' => $notice['title_en'] . ': ' . $notice['desc_en']]);
    if (tableExists('hostels')) {
        $stmt = db()->prepare("SELECT name,description FROM hostels WHERE status='published' AND is_active=1 AND (name LIKE ? OR description LIKE ?) LIMIT 1");
        $stmt->execute([$like, $like]); $hostel = $stmt->fetch();
        if ($hostel) respond(200, ['en' => $hostel['name'] . ': ' . ($hostel['description'] ?: 'Details are available on the Hostel page.'), 'hi' => $hostel['name'] . ': ' . ($hostel['description'] ?: 'Details are available on the Hostel page.')]);
    }
    if (tableExists('departments')) {
        $stmt = db()->prepare("SELECT name,description FROM departments WHERE status='published' AND is_active=1 AND (name LIKE ? OR description LIKE ? OR vision LIKE ?) LIMIT 1");
        $stmt->execute([$like, $like, $like]); $department = $stmt->fetch();
        if ($department) respond(200, ['en' => $department['name'] . ': ' . ($department['description'] ?: 'Department details are available on the Courses page.'), 'hi' => $department['name'] . ': ' . ($department['description'] ?: 'Department details are available on the Courses page.')]);
    }
    respond(200, ['en' => 'I could not find a verified answer in the CUSB database. Please use the Enquiry page for an official response.', 'hi' => 'मुझे CUSB डेटाबेस में सत्यापित उत्तर नहीं मिला। कृपया आधिकारिक उत्तर के लिए पूछताछ पृष्ठ का उपयोग करें।']);
}
if ($method === 'POST' && $route === 'enquiries') {
    $data = input(); $name = requiredText($data, 'fullName', 160); $email = requiredText($data, 'email', 254); $phone = requiredText($data, 'phone', 20); $category = requiredText($data, 'category', 40); $message = requiredText($data, 'message', 2000);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[0-9+() -]{7,20}$/', $phone)) respond(400, ['error' => 'Enter a valid email address and phone number.']);
    $ticket = publicCode('CUSB-ENQ');
    db()->prepare('INSERT INTO cms_enquiries (ticket_code,full_name,email,phone,category,programme_level,department,message) VALUES (?,?,?,?,?,?,?,?)')->execute([$ticket,$name,$email,$phone,$category,text($data,'programmeLevel') ?: null,text($data,'department') ?: null,$message]);
    respond(201, ['success' => true, 'ticket_code' => $ticket]);
}
if ($method === 'POST' && $route === 'admission-applications') {
    $data=input(); $name=requiredText($data,'fullName',160); $email=requiredText($data,'email',254); $phone=requiredText($data,'phone',20); $programme=requiredText($data,'programme',180); $level=requiredText($data,'programmeLevel',40);
    if (!filter_var($email,FILTER_VALIDATE_EMAIL) || !preg_match('/^[0-9+() -]{7,20}$/',$phone)) respond(400,['error'=>'Enter a valid email address and phone number.']);
    $code=publicCode('CUSB-APP'); db()->prepare('INSERT INTO cms_admission_applications (application_code,full_name,email,phone,programme,programme_level,external_reference) VALUES (?,?,?,?,?,?,?)')->execute([$code,$name,$email,$phone,$programme,$level,text($data,'externalReference') ?: null]);
    respond(201,['success'=>true,'application_code'=>$code]);
}
if ($method === 'GET' && $route === 'admin/stats') {
    requireUser(); $pdo = db();
    respond(200, ['announcements_count' => (int)$pdo->query('SELECT COUNT(*) FROM cms_announcements')->fetchColumn(), 'applications_count' => (int)$pdo->query('SELECT COUNT(*) FROM cms_admission_applications')->fetchColumn(), 'enquiries_count' => (int)$pdo->query('SELECT COUNT(*) FROM cms_enquiries')->fetchColumn(), 'active_sessions' => (int)$pdo->query('SELECT COUNT(*) FROM cms_sessions WHERE expires_at > UTC_TIMESTAMP()')->fetchColumn(), 'queries_count' => (int)$pdo->query('SELECT COUNT(*) FROM cms_audit_logs')->fetchColumn()]);
}
if ($method === 'GET' && $route === 'admin/logs') {
    requireUser(); $rows = db()->query('SELECT u.username, l.action, l.created_at FROM cms_audit_logs l JOIN cms_admin_users u ON u.id=l.user_id ORDER BY l.id DESC LIMIT 50')->fetchAll(); respond(200, $rows);
}
if ($method === 'GET' && $route === 'admin/list-users') {
    requireUser(); $rows = db()->query('SELECT username, created_at FROM cms_admin_users WHERE is_active=1 ORDER BY username')->fetchAll(); respond(200, $rows);
}
if ($method === 'GET' && $route === 'admin/enquiries') {
    requireUser(); respond(200, db()->query('SELECT id,ticket_code,full_name,email,phone,category,programme_level,department,message,status,created_at FROM cms_enquiries ORDER BY id DESC LIMIT 250')->fetchAll());
}
if ($method === 'GET' && $route === 'admin/admission-applications') {
    requireUser(); respond(200, db()->query('SELECT id,application_code,full_name,email,phone,programme,programme_level,external_reference,status,created_at FROM cms_admission_applications ORDER BY id DESC LIMIT 250')->fetchAll());
}

$user = null;
if ($method === 'POST') $user = requireUser();
if ($method === 'POST' && $route === 'homepage-stats') {
    $user = requireUser(); $data = input(); $stats = $data['stats'] ?? $data;
    if (!is_array($stats) || !isset($stats['metrics']) || !is_array($stats['metrics'])) respond(400, ['error' => 'A valid homepage statistics object is required.']);
    $json = json_encode($stats, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    db()->prepare('INSERT INTO cms_homepage_stats (stat_key,stats_json) VALUES (?,?) ON DUPLICATE KEY UPDATE stats_json=?,updated_at=UTC_TIMESTAMP()')->execute(['homepage_dashboard', $json, $json]);
    audit((int)$user['id'], 'Updated homepage university snapshot'); respond(200, ['success' => true]);
}
if ($method === 'POST' && $route === 'announcements') {
    $data = input(); $fields = [text($data,'titleEn'), text($data,'titleHi'), text($data,'descEn'), text($data,'descHi')];
    if (in_array('', $fields, true)) respond(400, ['error' => 'English and Hindi titles and descriptions are required.']);
    db()->prepare('INSERT INTO cms_announcements (title_en,title_hi,desc_en,desc_hi,type,image_url,date_str,published_at) VALUES (?,?,?,?,?,?,?,UTC_TIMESTAMP())')->execute([...$fields, text($data,'type') ?: 'ticker', text($data,'imageUrl') ?: null, text($data,'dateStr') ?: null]);
    audit((int)$user['id'], 'Added announcement: ' . mb_substr($fields[0], 0, 100)); respond(200, ['success' => true]);
}
if ($method === 'POST' && $route === 'announcements/update') {
    $data = input(); $id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT); $fields = [text($data,'titleEn'), text($data,'titleHi'), text($data,'descEn'), text($data,'descHi')];
    if (!$id || in_array('', $fields, true)) respond(400, ['error' => 'A valid ID and all announcement fields are required.']);
    db()->prepare('UPDATE cms_announcements SET title_en=?,title_hi=?,desc_en=?,desc_hi=?,type=?,image_url=?,date_str=?,updated_at=UTC_TIMESTAMP() WHERE id=?')->execute([...$fields, text($data,'type') ?: 'ticker', text($data,'imageUrl') ?: null, text($data,'dateStr') ?: null, $id]);
    audit((int)$user['id'], 'Updated announcement #' . $id); respond(200, ['success' => true]);
}
if ($method === 'POST' && $route === 'announcements/delete') {
    $data=input(); $id=filter_var($data['id'] ?? null, FILTER_VALIDATE_INT); if (!$id) respond(400,['error'=>'A valid announcement ID is required.']);
    db()->prepare('DELETE FROM cms_announcements WHERE id=?')->execute([$id]); audit((int)$user['id'], 'Deleted announcement #' . $id); respond(200,['success'=>true]);
}
if ($method === 'POST' && $route === 'gallery') {
    $data=input(); $titleEn=text($data,'titleEn'); $titleHi=text($data,'titleHi'); $imageUrl=text($data,'imageUrl'); if (!$titleEn || !$titleHi || !$imageUrl) respond(400,['error'=>'All gallery fields are required.']);
    db()->prepare('INSERT INTO cms_gallery (title_en,title_hi,image_url) VALUES (?,?,?)')->execute([$titleEn,$titleHi,$imageUrl]); audit((int)$user['id'], 'Added gallery item: ' . mb_substr($titleEn,0,100)); respond(200,['success'=>true]);
}
if ($method === 'POST' && $route === 'gallery/update') {
    $data=input(); $id=filter_var($data['id'] ?? null,FILTER_VALIDATE_INT); $titleEn=text($data,'titleEn'); $titleHi=text($data,'titleHi'); $imageUrl=text($data,'imageUrl'); if (!$id || !$titleEn || !$titleHi || !$imageUrl) respond(400,['error'=>'A valid ID and all gallery fields are required.']);
    db()->prepare('UPDATE cms_gallery SET title_en=?,title_hi=?,image_url=?,updated_at=UTC_TIMESTAMP() WHERE id=?')->execute([$titleEn,$titleHi,$imageUrl,$id]); audit((int)$user['id'],'Updated gallery item #' . $id); respond(200,['success'=>true]);
}
if ($method === 'POST' && $route === 'gallery/delete') {
    $data=input(); $id=filter_var($data['id'] ?? null,FILTER_VALIDATE_INT); if (!$id) respond(400,['error'=>'A valid gallery ID is required.']); db()->prepare('DELETE FROM cms_gallery WHERE id=?')->execute([$id]); audit((int)$user['id'],'Deleted gallery item #' . $id); respond(200,['success'=>true]);
}
if ($method === 'POST' && $route === 'admin/create-user') {
    $data=input(); $username=text($data,'username'); $password=(string)($data['password'] ?? ''); if (!preg_match('/^[A-Za-z0-9_.-]{3,80}$/',$username) || strlen($password)<10) respond(400,['error'=>'Use a valid username and a password with at least 10 characters.']);
    try { db()->prepare('INSERT INTO cms_admin_users (username,password_hash) VALUES (?,?)')->execute([$username,password_hash($password,PASSWORD_DEFAULT)]); } catch (PDOException) { respond(409,['error'=>'That username is already in use.']); } audit((int)$user['id'],'Created administrator: '.$username); respond(200,['success'=>true]);
}
if ($method === 'POST' && $route === 'admin/delete-user') {
    $data=input(); $target=text($data,'username'); if (!$target || $target===$user['username']) respond(400,['error'=>'Choose another administrator to remove.']); db()->prepare('UPDATE cms_admin_users SET is_active=0 WHERE username=?')->execute([$target]); audit((int)$user['id'],'Disabled administrator: '.$target); respond(200,['success'=>true]);
}
if ($method === 'POST' && $route === 'admin/update-credentials') {
    $data=input(); $newUsername=text($data,'username'); $newPassword=(string)($data['password'] ?? ''); if (!preg_match('/^[A-Za-z0-9_.-]{3,80}$/',$newUsername) || ($newPassword !== '' && strlen($newPassword)<10)) respond(400,['error'=>'Use a valid username and a password with at least 10 characters.']);
    try { if ($newPassword !== '') db()->prepare('UPDATE cms_admin_users SET username=?,password_hash=? WHERE id=?')->execute([$newUsername,password_hash($newPassword,PASSWORD_DEFAULT),$user['id']]); else db()->prepare('UPDATE cms_admin_users SET username=? WHERE id=?')->execute([$newUsername,$user['id']]); } catch (PDOException) { respond(409,['error'=>'That username is already in use.']); } audit((int)$user['id'],'Updated own administrator credentials'); respond(200,['success'=>true,'new_username'=>$newUsername]);
}
if ($method === 'POST' && $route === 'admin/enquiries/status') {
    $data=input(); $id=filter_var($data['id'] ?? null,FILTER_VALIDATE_INT); $status=text($data,'status'); if (!$id || !in_array($status,['new','in_progress','resolved','closed'],true)) respond(400,['error'=>'Invalid enquiry status.']); db()->prepare('UPDATE cms_enquiries SET status=? WHERE id=?')->execute([$status,$id]); audit((int)$user['id'],'Updated enquiry #' . $id); respond(200,['success'=>true]);
}
if ($method === 'POST' && $route === 'admin/admission-applications/status') {
    $data=input(); $id=filter_var($data['id'] ?? null,FILTER_VALIDATE_INT); $status=text($data,'status'); if (!$id || !in_array($status,['submitted','under_review','admitted','rejected','withdrawn'],true)) respond(400,['error'=>'Invalid application status.']); db()->prepare('UPDATE cms_admission_applications SET status=? WHERE id=?')->execute([$status,$id]); audit((int)$user['id'],'Updated admission application #' . $id); respond(200,['success'=>true]);
}
respond(404, ['error' => 'API route not found.']);
