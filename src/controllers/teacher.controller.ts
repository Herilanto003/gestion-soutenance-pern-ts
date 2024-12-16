import { Request, Response } from "express";
import * as teacherService from "../services/teacher.service";

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await teacherService.getTeachers();
    res.json(teachers).status(200);
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.getTeacherById(
      parseInt(req.params?.id)
    );
    res.json(teacher).status(200);
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.json(teacher).status(201);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.updateTeacher(
      parseInt(req.params?.id),
      req.body
    );
    res.json(teacher).status(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    await teacherService.deleteTeacher(parseInt(req.params?.id));
    res.json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
