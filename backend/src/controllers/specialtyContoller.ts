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

  async updateSpecialty(req: Request, res: Response, next: NextFunction) {
    try {
      const specialty = await Specialty.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!specialty)
        throw new Error("Couldn't find specialty in the database!");

      res
        .status(200)
        .json({ success: true, msg: "Specialty updated succesfully!" });
    } catch (error) {
      next(error);
    }
  }

  async removeSpecialty(req: Request, res: Response, next: NextFunction) {
    try {
      const specialty = await Specialty.findByIdAndDelete(req.params.id);
      if (!specialty)
        throw new Error("Couldn't find specialty in the database!");

      res
        .status(200)
        .json({ success: true, msg: "Specialty deleted succesfully!" });
    } catch (error) {
      next(error);
    }
  }
}
