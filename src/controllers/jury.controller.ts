import { Request, Response } from "express";
import * as jurieService from "../services/jury.service";

export const getJuries = async (req: Request, res: Response) => {
  try {
    const juries = await jurieService.getJuries();
    res.json(juries).status(200);
  } catch (error: any) {
    console.log("Controller: ", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getJurieById = async (req: Request, res: Response) => {
  try {
    const jurie = await jurieService.getJurieById(parseInt(req.params?.id));
    res.json(jurie).status(200);
  } catch (error: any) {
    console.log("Controller: ", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createJurie = async (req: Request, res: Response) => {
  try {
    const jurie = await jurieService.createJurie(req.body);
    res.json(jurie).status(201);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJurie = async (req: Request, res: Response) => {
  try {
    const jurie = await jurieService.updateJurie(
      parseInt(req.params?.id),
      req.body
    );
    res.json(jurie).status(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteJurie = async (req: Request, res: Response) => {
  try {
    await jurieService.deleteJurie(parseInt(req.params?.id));
    res.json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
