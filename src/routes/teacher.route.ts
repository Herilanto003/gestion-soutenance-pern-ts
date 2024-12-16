import { Router, Request, Response } from "express";
import * as teacherController from "../controllers/teacher.controller";

const router = Router();

router.post("/", teacherController.createTeacher);
router.get("/", teacherController.getTeachers);
router.get("/:id", teacherController.getTeacherById);
router.put("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

export default router;
