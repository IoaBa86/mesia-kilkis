# mesia.gr

Official informational website for **Μεσιά, Κιλκίς** (Mesia, a village in the Kilkis regional unit, Greece) — village info, local history, photos, events, and services, backed by a custom admin panel for managing all dynamic content.

Live at [mesia.gr](https://www.mesia.gr).

## Tech stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router) + [React 19](https://react.dev) + TypeScript
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com)
- **Database:** [PostgreSQL](https://www.postgresql.org) via [Neon](https://neon.tech), accessed through [Prisma ORM](https://www.prisma.io)
- **Auth:** [NextAuth.js](https://next-auth.js.org) (credentials-based admin login)
- **Content:** [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) for rich-text articles (history posts, etc.)
- **Maps:** [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) via `@react-google-maps/api`
- **Monetization:** Google AdSense, with ad placements managed from the admin panel
- **Hosting/CI:** [Vercel](https://vercel.com), auto-deployed from GitHub on push to `main`

## Project structure

```
src/
  app/                    # App Router pages and API routes
    admin/                # Admin panel (auth-gated via middleware)
    api/                  # Route handlers (public + admin)
    (public pages)/       # /village, /history, /events, /photos, /access, ...
    sitemap.ts            # Dynamic XML sitemap (DB-driven)
    robots.ts             # robots.txt
    not-found.tsx         # Custom 404
    error.tsx             # Route-level error boundary
    global-error.tsx      # Root-level error boundary
  components/             # Shared UI (layout, admin, maps, cookie consent, ...)
  lib/                    # Prisma client singleton, auth config, rate limiting
  middleware.ts           # Admin route protection — MUST stay under src/, not repo root
prisma/
  schema.prisma           # Database schema
  migrations/              # Migration history
scripts/                  # One-off local maintenance scripts (see below)
```

## Features

- **Public site:** village overview, local area guide, how-to-get-here with an embedded map, photo galleries by category, events calendar, local services directory, and Markdown-powered history articles.
- **Village Voices & Digital Museum:** two optional content sections (resident/visitor stories, virtual exhibits) — each independently toggled on/off from the admin panel, content fully managed there.
- **Admin panel:** manage events, photos, categories, historical posts, village voices, museum exhibits, ad slots, site settings, and cookie-consent stats — all behind authenticated `/admin` routes.
- **Cookie consent:** granular, GDPR-style consent banner wired into Google Consent Mode v2.
- **SEO:** per-page metadata tuned for local search (Μεσιά, Κιλκίς, Ευρωπός), dynamic sitemap that picks up new content automatically, and OG/social images generated at build time.

## Getting started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (this project targets [Neon](https://neon.tech))

### Setup

```bash
npm install
cp .env.example .env   # fill in the values — see below
npm run db:push        # sync the Prisma schema to your database
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See `.env.example` for the full list with descriptions. At minimum you need:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` / `DIRECT_DATABASE_URL` | Postgres connection strings (Neon pooled + direct) |
| `NEXTAUTH_SECRET` | Session encryption secret — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base URL of the deployment (`http://localhost:3000` locally) |
| `ADMIN_EMAIL` | Email of the account allowed to sign in to `/admin` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Enables the embedded map on the "Πώς να Έρθετε" page |

### Creating the first admin account

```bash
ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="choose-a-strong-password" node scripts/create-admin.js
```

This creates (or updates, if it already exists) a `User` row with `role: ADMIN`. Sign in at `/admin/login`. To reset the password later, run `scripts/fix-admin-password.js` the same way.

### Useful scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build (`prisma generate` + `next build`) |
| `npm run start` | Start the production server |
| `npm run lint` | Lint the codebase |
| `npm run db:push` | Push the Prisma schema to the database (no migration files) |
| `npm run db:migrate` | Create/apply a dev migration |
| `node scripts/seed-history-posts.js` | One-time seed of the original hardcoded history content into the `HistoricalPost` table |

## Deployment

The project deploys to Vercel automatically on push to `main`. Set all variables from `.env.example` in the Vercel project's Environment Variables settings before the first deploy. `postinstall` runs `prisma generate` automatically; `.npmrc` sets `legacy-peer-deps=true`, which is required for a clean install given the current NextAuth/nodemailer peer range.

Every build also runs `prisma migrate deploy` (see `build` in `package.json`), which applies any pending migrations in `prisma/migrations/` to the production database before `next build` runs. This means **schema changes only reach production when they exist as a committed migration file** — after editing `prisma/schema.prisma`, run `npx prisma migrate dev --name <description>` locally against a dev database, commit the generated migration folder, then push. Running `prisma db push` instead (no migration file) will not be picked up by this build step and will drift local/prod apart.

## Security notes

- `/admin/*` is protected by NextAuth middleware (`src/middleware.ts`) — only signed-in users with `role: ADMIN` can reach it.
- API routes that expose user-submitted or internal data are authenticated where appropriate; genuinely public endpoints return only the fields needed by the public pages that consume them.
- Security headers (CSP, HSTS, `X-Frame-Options`, etc.) are set in `next.config.ts`.
- The public `/api/cookie-consent` write endpoint is rate-limited and schema-validated.

If you believe you've found a security issue with this site, please do not open a public GitHub issue — contact the maintainer directly.
