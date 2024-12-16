import { Router } from "express";
import * as soutenanceController from "../controllers/soutenance.controller";

const router = Router();

router.post("/", soutenanceController.createSoutenance);
router.get("/", soutenanceController.getSoutenances);
router.get("/:id", soutenanceController.getSoutenanceById);
router.get("/juries/:id", soutenanceController.getJuriesInSoutenance);
router.put("/:id", soutenanceController.updateSoutenance);
router.delete("/:id", soutenanceController.deleteSoutenance);

export default router;
