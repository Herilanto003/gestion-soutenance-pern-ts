import { PrismaClient } from "@prisma/client";
import { Soutenances } from "@prisma/client";

const prisma = new PrismaClient();

export const getSoutenances = async (): Promise<Soutenances[]> => {
  try {
    return await prisma.soutenances.findMany();
  } catch (error: any) {
    console.error(error.message);

    throw new Error("Failed to fetch soutenances");
  }
};

export const getSoutenanceById = async (
  id: number
): Promise<Soutenances | null> => {
  try {
    return await prisma.soutenances.findUnique({
      where: { id },
    });
  } catch (error: any) {
    throw new Error("Failed to fetch this soutenance");
  }
};

export const createSoutenance = async (
  soutenance: Soutenances
): Promise<Soutenances | any> => {
  try {
    const student = await prisma.students.findUnique({
      where: { id: soutenance.studentId },
    });

    if (!student) {
      throw new Error("STUDENT_DOES_NOT_EXIST");
    }

    return await prisma.soutenances.create({
      data: soutenance,
    });
  } catch (error: any) {
    console.log(error.message);

    throw new Error(
      error.message === "STUDENT_DOES_NOT_EXIST"
        ? "STUDENT_DOES_NOT_EXIST"
        : "SERVER_ERROR"
    );
  }
};

export const updateSoutenance = async (
  id: number,
  soutenance: Soutenances
): Promise<Soutenances | null> => {
  try {
    const std = await prisma.soutenances.findUnique({ where: { id } });

    if (!std) {
      throw new Error("SOUTENANCE_DOES_NOT_EXIST");
    }

    return await prisma.soutenances.update({
      where: { id },
      data: soutenance,
    });
  } catch (error: any) {
    throw new Error(
      error.message === "SOUTENANCE_DOES_NOT_EXIST"
        ? error.message
        : "SERVER_ERROR"
    );
  }
};

export const deleteSoutenance = async (id: number): Promise<Soutenances> => {
  try {
    const soutenance = await prisma.soutenances.findUnique({
      where: { id },
    });

    if (!soutenance) {
      throw new Error("SOUTENANCE_DOES_NOT_EXIST");
    }

    return await prisma.soutenances.delete({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(
      error.message === "SOUTENANCE_DOES_NOT_EXIST"
        ? error.message
        : "SERVER_ERROR"
    );
  }
};

export const getJuriesInSoutenance = async (
  id: number
): Promise<Soutenances | null> => {
  try {
    return await prisma.soutenances.findUnique({
      where: { id },
      include: {
        juries: true,
      },
    });
  } catch (error: any) {
    throw new Error("Failed to fetch juries in this soutenance");
  }
};
