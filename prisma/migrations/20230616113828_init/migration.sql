-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "apellidos" TEXT,
    "email" TEXT,
    "genero" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "setUser" BOOLEAN NOT NULL DEFAULT false,
    "guide" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "idGoogle" INTEGER,
    "idFacebook" INTEGER,
    "token" TEXT[],
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "provider" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "token_idGoogle_key" ON "token"("idGoogle");

-- CreateIndex
CREATE UNIQUE INDEX "token_idFacebook_key" ON "token"("idFacebook");

-- CreateIndex
CREATE UNIQUE INDEX "token_token_key" ON "token"("token");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
