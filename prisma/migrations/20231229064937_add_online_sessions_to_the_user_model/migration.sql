-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastOnline" TIMESTAMP(3),
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false;
