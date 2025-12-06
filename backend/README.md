Backend deployment and configuration

Docker Compose (recommended)
- Path: `/srv/web/impress-backend/docker-compose.yml`
- Services:
  - `api`: `php:8.2-apache`, mounts `public` and `src`
  - `mysql`: MySQL 8, mounts `/srv/web/impress-backend/mysql` and runs `sql/schema.sql`
- Traefik labels: route `PathPrefix(/api)` to the API container on entrypoint `websecure`

Environment variables
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`
- `JWT_SECRET` for HMAC HS256 tokens
- `WEBHOOK_ORDER_STATUS` (optional) for order status webhooks

Database init
- Import `backend/sql/schema.sql` to provision tables: `users`, `products`, `orders`, `settings`, `projects`, `quotes`, `audit_logs`, `rate_limits`

Endpoints summary
- Auth: `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`, `GET /api/auth/me`
- Products: CRUD and bulk pricing; search/filter; RBAC admin required for writes
- Orders: create, status change, hold; no deletions
- Client portal: `GET /api/client/orders`, `GET/PUT /api/client/profile`
- Templates: `GET /api/templates`, `GET /api/templates/download?name=...`, `POST /api/templates/validate`

Security notes
- Enforce HTTPS via Traefik; do not commit secrets
- Rate limiting per IP+path is enabled; adjust thresholds in `public/index.php`
