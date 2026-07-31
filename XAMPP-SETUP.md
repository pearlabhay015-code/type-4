# Run the CUSB CMS on XAMPP

1. Start **Apache** and **MySQL** from the XAMPP Control Panel.
2. The local Apache configuration maps `http://localhost:8080/type4/` directly to this workspace. If the project is moved, update the `Alias /type4` and matching `<Directory>` entry in `C:\xampp\apache\conf\httpd.conf`.
3. Open phpMyAdmin at `http://localhost:8080/phpmyadmin`, select **Import**, and import `database/cusb_cms_xampp.sql` only if the `cusb_website` database has not already been created.
4. Change `DB_PASSWORD` in `api/index.php` to the database password chosen in the SQL file before exposing the site on any public network.
5. Open `http://localhost:8080/type4/admin.html`. The first visitor creates the first administrator account. Use a strong password of at least 10 characters.

The public website is available at `http://localhost:8080/type4/` on this computer. Announcements and gallery content made in `admin-panel.html` are saved immediately in MariaDB and displayed within 30 seconds. Public enquiries and admission registrations are stored in the protected admin queue; administrators can update their statuses there. Search, chatbot, department, research, recruitment, tender, and admission endpoints use the same MariaDB database. The database uses indexed, independent records so adding records does not overwrite page content or alter existing data.

For local visual previews on `http://localhost:8000`, the frontend automatically requests the XAMPP API at `http://localhost:8080/type4/api/`. Use the XAMPP URL above for the admin portal and normal end-to-end testing; the Python preview server is no longer the source of dynamic data.

For a public no-cost deployment, use a school-managed server, a university subdomain, or a free PHP/MySQL host that supports HTTPS. Do not expose XAMPP directly to the public internet; it is appropriate for development and a protected local network only. A real public admission service also needs CUSB approval, a privacy notice, consent collection, backups, HTTPS, and an official CUET/Samarth integration before it can claim to receive final admissions.
