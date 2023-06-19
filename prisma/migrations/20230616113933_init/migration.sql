/*
  Warnings:

  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_userId_fkey";

-- DropTable
DROP TABLE "token";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "apellidos" TEXT,
    "email" TEXT,
    "genero" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "setUser" BOOLEAN NOT NULL DEFAULT false,
    "guide" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "idGoogle" INTEGER,
    "idFacebook" INTEGER,
    "token" TEXT[],
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "provider" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_idGoogle_key" ON "Token"("idGoogle");

-- CreateIndex
CREATE UNIQUE INDEX "Token_idFacebook_key" ON "Token"("idFacebook");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
