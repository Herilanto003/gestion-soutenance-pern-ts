import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTotals = async (): Promise<any> => {
  // total des students
  const totalStudents = await prisma.students.count();

  // total des teachers
  const totalTeachers = await prisma.teachers.count();

  // total soutenances
  const totalSoutenances = await prisma.soutenances.count();

  // total des soutenances selon les status
  const totalSoutenanceStatut = await prisma.soutenances.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  return {
    totalStudents,
    totalTeachers,
    totalSoutenances,
    totalSoutenanceStatut,
  };
};
