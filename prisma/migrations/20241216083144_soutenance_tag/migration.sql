/*
  Warnings:

  - Added the required column `tag` to the `Soutenances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Soutenances" ADD COLUMN     "tag" BOOLEAN NOT NULL;
