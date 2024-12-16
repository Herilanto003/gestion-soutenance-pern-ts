import { Router } from "express";
import studentRoutes from "./student.route";

const routes = Router();

routes.use("/students", studentRoutes);

export default routes;
