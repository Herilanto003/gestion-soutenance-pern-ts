/*
  Warnings:

  - You are about to drop the column `date` on the `Soutenances` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `Soutenances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Soutenances" DROP COLUMN "date",
DROP COLUMN "hour",
ADD COLUMN     "dateAndHour" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
