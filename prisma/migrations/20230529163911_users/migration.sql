-- DropForeignKey
ALTER TABLE "UserGoogle" DROP CONSTRAINT "UserGoogle_email_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_emailGoogle_fkey" FOREIGN KEY ("emailGoogle") REFERENCES "UserGoogle"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
