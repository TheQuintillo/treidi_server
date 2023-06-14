/*
  Warnings:

  - A unique constraint covering the columns `[idGoogle]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idFacebook]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idFacebook" TEXT,
ADD COLUMN     "idGoogle" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "apellidos" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "genero" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_idGoogle_key" ON "User"("idGoogle");

-- CreateIndex
CREATE UNIQUE INDEX "User_idFacebook_key" ON "User"("idFacebook");
