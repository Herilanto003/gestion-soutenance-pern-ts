import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = await prisma.user.findUnique({ where: { email } });

    if (existUser) {
      throw new Error("EMAIL_ALREADY_EXIST");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.json({
      user,
      status: "SUCCESS",
    });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("CREDENTIALS_INVALID");
    }

    const token = generateToken({ userId: user.id });

    res.json({
      email: user.email,
      token,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
