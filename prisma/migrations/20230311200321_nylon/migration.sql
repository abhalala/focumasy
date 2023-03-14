-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEVELOPER', 'ADMIN', 'MANAGER', 'WORKER');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "OrderEntity" ADD COLUMN     "dieVariantSnap" TEXT;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "currentDie" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'WORKER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuthToken" (
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activationState" BOOLEAN DEFAULT true,
    "userId" TEXT,

    CONSTRAINT "UserAuthToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Die" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currentVariant" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Die_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DieToVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_DieToVariant_AB_unique" ON "_DieToVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_DieToVariant_B_index" ON "_DieToVariant"("B");

-- AddForeignKey
ALTER TABLE "UserAuthToken" ADD CONSTRAINT "UserAuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DieToVariant" ADD CONSTRAINT "_DieToVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Die"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DieToVariant" ADD CONSTRAINT "_DieToVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
