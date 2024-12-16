/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,soutenanceId]` on the table `Juries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Juries_teacherId_soutenanceId_key" ON "Juries"("teacherId", "soutenanceId");
