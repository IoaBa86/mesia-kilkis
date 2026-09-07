# Deploying to a VPS with Coolify

## 1. Create the resource

In Coolify: **New Resource → Public/Private Repository → Dockerfile** (or "Application" pointing at this Git repo). Coolify detects and builds the root `Dockerfile` — no other build config is required. Port: **3000**.

## 2. Environment variables

Set these in the Coolify app's **Environment Variables** tab (values from `.env.example`):

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Pooled Postgres connection string (Neon, or a Postgres service added in Coolify) |
| `DIRECT_DATABASE_URL` | Direct (non-pooled) connection string — used for `prisma migrate deploy` |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your public site URL, e.g. `https://mesia.gr` |
| `ADMIN_EMAIL` | Must match a real ADMIN user's email in the DB |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Restrict this key to your domain in Google Cloud Console |

SMTP is configured at runtime from `/admin/settings`, not via env vars.

## 3. Persistent storage

Admin-uploaded photos/logos are written to disk at runtime (`public/uploads`). Without a volume, they're lost on every redeploy. In Coolify, add a **Persistent Storage** volume on the app:

- Container path: `/app/public/uploads`

## 4. Database migrations

Migrations run automatically on container start (`docker-entrypoint.sh` runs `prisma migrate deploy` before `next start`) — not during the image build. This keeps DB credentials out of build layers and means each deploy applies any pending migrations against whatever `DATABASE_URL` is set at runtime.

## 5. Domain/SSL

Point your domain's DNS at the VPS, then set it as the app's domain in Coolify — it provisions Let's Encrypt SSL automatically.

## 6. First deploy checklist

- [ ] Env vars set (table above)
- [ ] Persistent volume mounted at `/app/public/uploads`
- [ ] An ADMIN user exists in the DB matching `ADMIN_EMAIL` (run `scripts/create-admin.js` once, e.g. via Coolify's terminal/exec into the running container, with `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars set)
- [ ] Domain + SSL configured
