/*
  Warnings:

  - A unique constraint covering the columns `[emailGoogle]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailGoogle` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailGoogle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_emailGoogle_key" ON "User"("emailGoogle");

-- AddForeignKey
ALTER TABLE "UserGoogle" ADD CONSTRAINT "UserGoogle_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("emailGoogle") ON DELETE RESTRICT ON UPDATE CASCADE;
