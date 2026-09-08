-- CreateTable
-- The `cookie_consents` table was referenced by schema.prisma (CookieConsent
-- model) but no migration ever created it, so /api/cookie-consent has been
-- failing on every request against any database that only ever ran
-- `prisma migrate deploy` (as opposed to a one-off `db push`).
CREATE TABLE "public"."cookie_consents" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "ipHash" TEXT,
    "consentGiven" BOOLEAN NOT NULL,
    "categories" JSONB NOT NULL,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cookie_consents_pkey" PRIMARY KEY ("id")
);
