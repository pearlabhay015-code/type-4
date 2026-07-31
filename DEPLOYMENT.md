# Production deployment

GitHub Pages publishes the public HTML, CSS, JavaScript, and assets. It cannot run
PHP or MySQL, so deploy the `Dockerfile` as a separate HTTPS API service and use a
managed MySQL 8 database. Do not publish the XAMPP installation or `admin.db`.

## Deploy the API and database

1. Create a managed MySQL 8 database and import `database/cusb_cms_xampp.sql`.
2. Deploy this repository's `Dockerfile` to a container-capable host. Its public
   service URL must expose the application on port `80`, so the API endpoint is
   `https://your-api-host.example/api`.
3. Set these environment variables on the API service:

   ```text
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_NAME=cusb_website
   DB_USER=cusb_cms
   DB_PASSWORD=a-long-unique-password
   CORS_ALLOWED_ORIGINS=https://pearlabhay015-code.github.io
   ```

   Use the credentials created for the database instead of the development password
   in the SQL file. Allow inbound access to MySQL only from the API service.

4. Confirm `https://your-api-host.example/api/setup-status` returns JSON before
   publishing the frontend.

For a local production-like check, copy `.env.example` to `.env`, replace both
passwords, then run `docker compose up --build`. The API will be available at
`http://localhost:8080/api/setup-status`.

## Publish GitHub Pages

1. In the GitHub repository, open **Settings → Pages** and select **GitHub Actions**
   as the source.
2. In **Settings → Secrets and variables → Actions → Variables**, add
   `CUSB_API_URL` with the exact HTTPS API URL ending in `/api`.
3. Push to `main` or run the **Deploy public site to GitHub Pages** workflow.

The workflow refuses to publish without a valid API URL, preventing a public site
that appears live but has a non-working CMS/database. The public URL will be
`https://pearlabhay015-code.github.io/type-4/` once the workflow completes.
