import { Router } from "express";
import studentRoutes from "./student.route";
import teacherRoutes from "./teacher.route";
import soutenanceRoutes from "./soutenance.route";
import jurieRoutes from "./jury.route";
import dashboardRoutes from "./dashboard.route";
import authRoutes from "./auth.route";
import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

routes.use("/students", authenticate, studentRoutes);
routes.use("/teachers", authenticate, teacherRoutes);
routes.use("/soutenances", authenticate, soutenanceRoutes);
routes.use("/jurie", authenticate, jurieRoutes);
routes.use("/dashboard", authenticate, dashboardRoutes);
routes.use("/auth", authRoutes);

export default routes;
