import { Request, Response } from "express";
import * as studentService from "../services/student.service";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getStudents();
    res.json(students).status(200);
  } catch (error: any) {
    console.log("Controller: ", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getStudentById(
      parseInt(req.params?.id)
    );
    res.json(student).status(200);
  } catch (error: any) {
    console.log("Controller: ", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.json(student).status(201);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.updateStudent(
      parseInt(req.params?.id),
      req.body
    );
    res.json(student).status(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await studentService.deleteStudent(parseInt(req.params?.id));
    res.status(204).json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
