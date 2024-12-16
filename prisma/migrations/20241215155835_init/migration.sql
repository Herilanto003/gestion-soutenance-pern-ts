-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('HOMME', 'FEMME');

-- CreateEnum
CREATE TYPE "RoleJury" AS ENUM ('ENCADREUR', 'PRESIDENT', 'EXAMINATEUR');

-- CreateEnum
CREATE TYPE "StatusSoutenance" AS ENUM ('EN_COURS', 'ANNULE', 'FINI');

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sexe" "Sexe" NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sexe" "Sexe" NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soutenances" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hour" TIMESTAMP(3) NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "studentId" INTEGER NOT NULL,
    "status" "StatusSoutenance" NOT NULL,

    CONSTRAINT "Soutenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Juries" (
    "id" SERIAL NOT NULL,
    "role" "RoleJury" NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "soutenanceId" INTEGER NOT NULL,

    CONSTRAINT "Juries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_registerNumber_key" ON "Students"("registerNumber");

-- AddForeignKey
ALTER TABLE "Soutenances" ADD CONSTRAINT "Soutenances_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Juries" ADD CONSTRAINT "Juries_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Juries" ADD CONSTRAINT "Juries_soutenanceId_fkey" FOREIGN KEY ("soutenanceId") REFERENCES "Soutenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
