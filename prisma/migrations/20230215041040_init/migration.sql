-- CreateEnum
CREATE TYPE "BundleStatus" AS ENUM ('STOCK', 'SOLD');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "uniqueName" TEXT NOT NULL,
    "printName" TEXT NOT NULL,
    "name" TEXT,
    "dimensions" JSONB DEFAULT '{ "l": 0, "b": 0, "t": 0, "lg": 0 }',

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderEntity" (
    "id" TEXT NOT NULL,
    "weight" DECIMAL(65,30),
    "orderId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,

    CONSTRAINT "OrderEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bundle" (
    "id" TEXT NOT NULL,
    "cast" INTEGER NOT NULL,
    "serial" SERIAL NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "length" DECIMAL(65,30) NOT NULL,
    "status" "BundleStatus" NOT NULL DEFAULT 'STOCK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "variantId" INTEGER NOT NULL,
    "orderEntityId" TEXT,

    CONSTRAINT "Bundle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Variant_uniqueName_key" ON "Variant"("uniqueName");

-- CreateIndex
CREATE UNIQUE INDEX "Bundle_cast_key" ON "Bundle"("cast");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEntity" ADD CONSTRAINT "OrderEntity_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEntity" ADD CONSTRAINT "OrderEntity_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_orderEntityId_fkey" FOREIGN KEY ("orderEntityId") REFERENCES "OrderEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
