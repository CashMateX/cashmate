-- AlterTable
ALTER TABLE "InstanceSettings" ALTER COLUMN "currency" SET DEFAULT '$';

-- CreateTable
CREATE TABLE "ReccuringTransaction" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,
    "tag_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "value" DOUBLE PRECISION NOT NULL,
    "expenses" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReccuringTransaction_pkey" PRIMARY KEY ("id")
);
