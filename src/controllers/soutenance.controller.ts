import { Request, Response } from "express";
import * as soutenanceService from "../services/soutenance.service";

export const getSoutenances = async (req: Request, res: Response) => {
  try {
    const soutenances = await soutenanceService.getSoutenances();
    res.json(soutenances).status(200);
  } catch (error: any) {
    console.log("Controller: ", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSoutenanceById = async (req: Request, res: Response) => {
  try {
    const soutenance = await soutenanceService.getSoutenanceById(
      parseInt(req.params?.id)
    );
    res.json(soutenance).status(200);
  } catch (error: any) {
    console.log("Controller: ", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSoutenance = async (req: Request, res: Response) => {
  try {
    const soutenance = await soutenanceService.createSoutenance(req.body);
    res.json(soutenance).status(201);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSoutenance = async (req: Request, res: Response) => {
  try {
    const soutenance = await soutenanceService.updateSoutenance(
      parseInt(req.params?.id),
      req.body
    );
    res.json(soutenance).status(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSoutenance = async (req: Request, res: Response) => {
  try {
    await soutenanceService.deleteSoutenance(parseInt(req.params?.id));
    res.json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getJuriesInSoutenance = async (req: Request, res: Response) => {
  try {
    const juries = await soutenanceService.getJuriesInSoutenance(
      parseInt(req.params?.id)
    );
    res.json(juries).status(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
