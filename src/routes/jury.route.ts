import { Router } from "express";
import * as jurieController from "../controllers/jury.controller";

const router = Router();

router.post("/", jurieController.createJurie);
router.get("/", jurieController.getJuries);
router.get("/:id", jurieController.getJurieById);
router.put("/:id", jurieController.updateJurie);
router.delete("/:id", jurieController.deleteJurie);

export default router;
