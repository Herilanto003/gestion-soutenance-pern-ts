import { Router } from "express";
import studentRoutes from "./student.route";
import teacherRoutes from "./teacher.route";

const routes = Router();

routes.use("/students", studentRoutes);
routes.use("/teachers", teacherRoutes);

export default routes;
