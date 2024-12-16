import { PrismaClient } from "@prisma/client";
import { Students } from "@prisma/client";

const prisma = new PrismaClient();

export const getStudents = async (): Promise<Students[]> => {
  try {
    return await prisma.students.findMany();
  } catch (error: any) {
    console.error(error.message);

    throw new Error("Failed to fetch students");
  }
};

export const getStudentById = async (id: number): Promise<Students | null> => {
  try {
    return await prisma.students.findUnique({
      where: { id },
    });
  } catch (error: any) {
    console.error(error.type === "Unique constraint failed");

    throw new Error("Failed to fetch this student");
  }
};

export const createStudent = async (
  student: Students
): Promise<Students | any> => {
  try {
    // Vérifier si le registerNumber existe déjà
    const existingStudent = await prisma.students.findUnique({
      where: { registerNumber: student.registerNumber },
    });

    if (existingStudent) {
      throw new Error("REGISTER_NUMBER_EXIST");
    }

    return await prisma.students.create({
      data: student,
    });
  } catch (error: any) {
    throw new Error(
      error.message === "REGISTER_NUMBER_EXIST"
        ? error.message
        : "SERVER DISCONNECTED"
    );
  }
};

export const updateStudent = async (
  id: number,
  student: Students
): Promise<Students | null> => {
  try {
    // Vérifier si un autre étudiant avec le même registerNumber existe
    const existingStudentWithSameRegisterNumber =
      await prisma.students.findFirst({
        where: {
          registerNumber: student.registerNumber,
          NOT: { id: id }, // l'ID de l'étudiant n'est pas le même
        },
      });

    if (existingStudentWithSameRegisterNumber) {
      throw new Error("REGISTER_NUMBER_EXIST");
    }

    const std = await prisma.students.findUnique({ where: { id } });

    if (!std) {
      throw new Error("STUDENT_DOES_NOT_EXIST");
    }

    return await prisma.students.update({
      where: { id },
      data: student,
    });
  } catch (error: any) {
    throw new Error(
      error.message === "REGISTER_NUMBER_EXIST"
        ? error.message
        : error.message === "STUDENT_DOES_NOT_EXIST"
        ? error.message
        : "SERVER_ERROR"
    );
  }
};

export const deleteStudent = async (id: number): Promise<Students> => {
  try {
    const student = await prisma.students.findUnique({
      where: { id },
    });

    if (!student) {
      throw new Error("STUDENT_DOES_NOT_EXIST");
    }

    return await prisma.students.delete({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(
      error.message === "STUDENT_DOES_NOT_EXIST"
        ? error.message
        : "SERVER_ERROR"
    );
  }
};
