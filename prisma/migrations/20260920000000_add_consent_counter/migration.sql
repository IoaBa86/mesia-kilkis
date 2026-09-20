-- CreateTable
-- Aggregate-only consent statistics: one row per outcome, no per-visitor data.
CREATE TABLE "public"."consent_counters" (
    "kind" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consent_counters_pkey" PRIMARY KEY ("kind")
);
