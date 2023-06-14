-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "setUser" BOOLEAN NOT NULL DEFAULT false,
    "guide" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoogle" (
    "id" SERIAL NOT NULL,
    "idGoogle" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "token" TEXT[],

    CONSTRAINT "UserGoogle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFacebook" (
    "id" SERIAL NOT NULL,
    "idFacebook" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "token" TEXT[],

    CONSTRAINT "UserFacebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoogle_idGoogle_key" ON "UserGoogle"("idGoogle");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoogle_email_key" ON "UserGoogle"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserFacebook_idFacebook_key" ON "UserFacebook"("idFacebook");
