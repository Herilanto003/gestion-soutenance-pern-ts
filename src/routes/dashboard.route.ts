import { Router } from "express";
import * as dashboardController from "../controllers/dashobard.controller";

const router = Router();

router.get("/totals", dashboardController.getTotals);

export default router;
