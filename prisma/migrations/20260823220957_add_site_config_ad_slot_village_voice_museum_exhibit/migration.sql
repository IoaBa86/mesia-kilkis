-- CreateEnum
CREATE TYPE "VoiceType" AS ENUM ('RESIDENT_STORY', 'YOUTH_STORY', 'TESTIMONIAL');

-- CreateEnum
CREATE TYPE "ExhibitType" AS ENUM ('EXHIBIT', 'AUDIO_GUIDE', 'VIRTUAL_TOUR', 'ARTIFACT');




-- CreateTable
CREATE TABLE "site_config" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "site_config_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "ad_slots" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "adClient" TEXT NOT NULL,
    "adSlotId" TEXT NOT NULL,
    "adFormat" TEXT NOT NULL DEFAULT 'auto',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ad_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "village_voices" (
    "id" TEXT NOT NULL,
    "type" "VoiceType" NOT NULL,
    "authorName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "village_voices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "museum_exhibits" (
    "id" TEXT NOT NULL,
    "type" "ExhibitType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "mediaUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "museum_exhibits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ad_slots_key_key" ON "ad_slots"("key");

-- CreateIndex
CREATE INDEX "ad_slots_page_idx" ON "ad_slots"("page");

-- CreateIndex
CREATE INDEX "ad_slots_isActive_idx" ON "ad_slots"("isActive");

-- CreateIndex
CREATE INDEX "village_voices_type_idx" ON "village_voices"("type");

-- CreateIndex
CREATE INDEX "village_voices_isActive_idx" ON "village_voices"("isActive");

-- CreateIndex
CREATE INDEX "village_voices_order_idx" ON "village_voices"("order");

-- CreateIndex
CREATE INDEX "museum_exhibits_type_idx" ON "museum_exhibits"("type");

-- CreateIndex
CREATE INDEX "museum_exhibits_isActive_idx" ON "museum_exhibits"("isActive");

-- CreateIndex
CREATE INDEX "museum_exhibits_order_idx" ON "museum_exhibits"("order");

-- AddForeignKey
ALTER TABLE "village_voices" ADD CONSTRAINT "village_voices_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "museum_exhibits" ADD CONSTRAINT "museum_exhibits_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

