import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getTotals = async (req: Request, res: Response) => {
  try {
    const totals = await dashboardService.getTotals();
    res.json({
      totals,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to get totals" });
  }
};
