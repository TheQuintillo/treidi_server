/*
  Warnings:

  - You are about to drop the column `emailGoogle` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_emailGoogle_fkey";

-- DropIndex
DROP INDEX "User_emailGoogle_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailGoogle";
