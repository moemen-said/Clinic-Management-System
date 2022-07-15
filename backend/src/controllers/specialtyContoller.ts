import { Request, Response, NextFunction } from "express";
import { Specialty, specialtyDocument } from "../models/specialty";

export class SpecialtyController {
  constructor() {}

  async createSpecialty(req: Request, res: Response, next: NextFunction) {
    try {
      const newSpecialty: specialtyDocument = await new Specialty(req.body);
      await newSpecialty.save();
      res
        .status(201)
        .json({ success: true, msg: "Specialty created succesfully!" });
    } catch (error) {
      next(error);
    }
  }
}
