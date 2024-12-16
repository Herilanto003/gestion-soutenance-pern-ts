import { PrismaClient } from "@prisma/client";
import { Teachers } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeachers = async (): Promise<Teachers[]> => {
  try {
    return await prisma.teachers.findMany();
  } catch (error: any) {
    console.error(error.message);

    throw new Error("Failed to fetch teachers");
  }
};

export const getTeacherById = async (id: number): Promise<Teachers | null> => {
  try {
    return await prisma.teachers.findUnique({
      where: { id },
    });
  } catch (error: any) {
    console.error(error.type === "Unique constraint failed");

    throw new Error("Failed to fetch this teacher");
  }
};

export const createTeacher = async (
  teacher: Teachers
): Promise<Teachers | any> => {
  try {
    return await prisma.teachers.create({
      data: teacher,
    });
  } catch (error: any) {
    throw new Error("SERVER DISCONNECTED");
  }
};

export const updateTeacher = async (
  id: number,
  teacher: Teachers
): Promise<Teachers | null> => {
  try {
    const tchr = await prisma.teachers.findUnique({
      where: { id },
    });

    if (!tchr) {
      throw new Error("TEACHER_DOES_NOT_EXIST");
    }

    return await prisma.teachers.update({
      where: { id },
      data: teacher,
    });
  } catch (error: any) {
    throw new Error(
      error.message === "TEACHER_DOES_NOT_EXIST"
        ? error.message
        : "SERVER_ERROR"
    );
  }
};

export const deleteTeacher = async (id: number): Promise<Teachers> => {
  try {
    const teacher = await prisma.teachers.findUnique({
      where: { id },
    });

    if (!teacher) {
      throw new Error("TEACHER_DOES_NOT_EXIST");
    }

    return await prisma.teachers.delete({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(
      error.message === "TEACHER_DOES_NOT_EXIST"
        ? error.message
        : "SERVER_ERROR"
    );
  }
};
