# Impress Print Concepts — Web App

## Overview
- Frontend: React + Vite + Tailwind, SPA routing via `src/App.tsx`
- Backend: PHP (PDO/MySQL) REST API with JWT/Session auth in `backend/public/index.php`
- Deployment: Static frontend served by Nginx behind Traefik; API served by `php:8.2-apache` behind Traefik

## Key Features
- Catalog-backed product dropdown (`src/components/ProductDropdown.tsx`)
- Multi-step checkout with validation and guest flow (`src/components/Checkout.tsx`)
- Responsive images and mobile-first product grids (`src/components/Shop.tsx`, `src/components/CategoryPage.tsx`, `src/components/ProductPage.tsx`)
- Client portal: orders, profile endpoints
- RBAC: client, admin, superadmin enforced server-side
- Templates page for file specs (`src/components/FileSpecsPage.tsx`) with secure downloads
- A/B testing hooks (`src/lib/ab.ts`) for conversion metrics

## Frontend
- Dev: `npm run dev` (Vite)
- Build: `npm run build` → output in `dist/`
- Currency + formatting: `src/lib/utils.ts`
- Page title bars support image/video backgrounds: `src/components/PageTitleBar.tsx`

## Backend
- Config: `backend/src/config.php` (env vars supported)
- DB: MySQL, schema in `backend/sql/schema.sql`
- Router: `backend/public/index.php`
- Auth helpers: `backend/src/auth.php`
- Templates: `backend/public/templates/*` (CSV/JSON/XML)

### Environment Variables
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`
- `JWT_SECRET` (HMAC HS256)
- `WEBHOOK_ORDER_STATUS` (optional webhook URL)

### API Endpoints (summary)
- Auth: `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`, `GET /api/auth/me`
- Products:
  - `GET /api/products?q=&category=&min=&max=`
  - `POST /api/products` (admin)
  - `PUT /api/products/:id` (admin)
  - `PATCH /api/products/pricing` (admin bulk)
- Orders:
  - `GET /api/orders` (admin)
  - `GET /api/orders/search?orderNumber=`
  - `POST /api/orders` (admin)
  - `POST /api/orders/:id/status` (admin)
  - `PATCH /api/orders/:id/hold` (admin)
- Client portal:
  - `GET /api/client/orders`, `GET /api/client/profile`, `PUT /api/client/profile`
- Files/templates:
  - `GET /api/templates`, `GET /api/templates/download?name=...`
  - `POST /api/templates/validate` (admin)

### RBAC
- Clients: access own profile/orders
- Admins: product/order management, template validation
- Superadmin: can be extended to user management & system config

### Location Auto-fill
- Checkout step 2 shows location consent toggle
- When enabled: GPS → IP fallback; manual override fields; accuracy indicator; recent locations cached
- GDPR: user consent required; location used only to estimate delivery options

## Deployment
- Frontend: Traefik router `impress-web` serving static `dist/`
- Backend: `docker-compose` in `/srv/web/impress-backend/docker-compose.yml`
  - `api` service: `php:8.2-apache` mounts `public` and `src`
  - `mysql` service: MySQL with data volume and schema init
  - Traefik rule: `PathPrefix(/api)` → `impress-api`

## Security & Auditing
- JWT + session auth
- Audit logs for product/order/profile/template operations
- Rate limiting per IP+path
- HTTPS via Traefik certificate resolver `le`

## Testing
- Frontend: verify responsive behavior (320px → 4K), lazy images, keyboard navigation
- Backend: cURL tests for auth/products/orders/templates; validate templates across formats

## Maintenance
- Docs: `docs/images.md`, `docs/ab_testing.md`
- Version control: GitHub `main`
- Monitoring: extend audit and add error metrics as needed
