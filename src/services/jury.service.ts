import { PrismaClient } from "@prisma/client";
import { Juries } from "@prisma/client";

const prisma = new PrismaClient();

export const getJuries = async (): Promise<Juries[]> => {
  try {
    return await prisma.juries.findMany();
  } catch (error: any) {
    console.error(error.message);

    throw new Error("Failed to fetch juries");
  }
};

export const getJurieById = async (id: number): Promise<Juries | null> => {
  try {
    return await prisma.juries.findUnique({
      where: { id },
    });
  } catch (error: any) {
    console.error(error.type === "Unique constraint failed");

    throw new Error("Failed to fetch this jurie");
  }
};

export const createJurie = async (jurie: Juries): Promise<Juries | any> => {
  try {
    const teacher = await prisma.teachers.findUnique({
      where: { id: jurie.teacherId },
    });
    const soutenance = await prisma.soutenances.findUnique({
      where: { id: jurie.soutenanceId },
    });

    if (!teacher) {
      throw new Error("TEACHER_DOES_NOT_EXIST");
    }

    if (!soutenance) {
      throw new Error("SOUTENANCE_DOES_NOT_EXIST");
    }

    const roleExist = await prisma.juries.findFirst({
      where: {
        AND: {
          soutenanceId: jurie.soutenanceId,
          role: jurie.role,
        },
      },
    });

    const teacherSoutenance = await prisma.juries.findFirst({
      where: {
        AND: {
          soutenanceId: jurie.soutenanceId,
          teacherId: jurie.teacherId,
        },
      },
    });

    if (roleExist) {
      throw new Error("JURY_ROLE_ALREADY_EXIST");
    }

    if (teacherSoutenance) {
      throw new Error("TEACHER_ALREADY_BUSY");
    }

    return await prisma.juries.create({
      data: jurie,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateJurie = async (
  id: number,
  jurie: Juries
): Promise<Juries | null> => {
  try {
    const teacher = await prisma.teachers.findUnique({
      where: { id: jurie.teacherId },
    });
    const soutenance = await prisma.soutenances.findUnique({
      where: { id: jurie.soutenanceId },
    });

    if (!teacher) {
      throw new Error("TEACHER_DOES_NOT_EXIST");
    }

    if (!soutenance) {
      throw new Error("SOUTENANCE_DOES_NOT_EXIST");
    }

    const jury = await prisma.juries.findUnique({ where: { id } });

    if (!jury) {
      throw new Error("JURIE_DOES_NOT_EXIST");
    }

    const teacherSoutenance = await prisma.juries.findFirst({
      where: {
        AND: {
          soutenanceId: jurie.soutenanceId,
          teacherId: jurie.teacherId,
          NOT: {
            id: id,
          },
        },
      },
    });

    if (teacherSoutenance) {
      throw new Error("TEACHER_ALREADY_BUSY");
    }

    return await prisma.juries.update({
      where: { id },
      data: jurie,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteJurie = async (id: number): Promise<Juries> => {
  try {
    const jurie = await prisma.juries.findUnique({
      where: { id },
    });

    if (!jurie) {
      throw new Error("JURIE_DOES_NOT_EXIST");
    }

    return await prisma.juries.delete({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
