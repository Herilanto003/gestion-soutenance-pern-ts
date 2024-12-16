import { Router } from "express";
import studentRoutes from "./student.route";
import teacherRoutes from "./teacher.route";
import soutenanceRoutes from "./soutenance.route";

const routes = Router();

routes.use("/students", studentRoutes);
routes.use("/teachers", teacherRoutes);
routes.use("/soutenances", soutenanceRoutes);

export default routes;
