/*
  Warnings:

  - Added the required column `email` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teachers" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
