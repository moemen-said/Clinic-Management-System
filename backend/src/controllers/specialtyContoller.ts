import { Request, Response, NextFunction } from "express";
import { Specialty, specialtyDocument } from "../models/specialty";

export class SpecialtyController {
  constructor() {}

  async createSpecialty(req: any, res: Response, next: NextFunction) {
    try {
      if (req.role !== "admin") {
        throw new Error("Unauthorized Operation!");
      }
      const newSpecialty: specialtyDocument = await new Specialty(req.body);
      await newSpecialty.save();
      res
        .status(201)
        .json({ success: true, msg: "Specialty created succesfully!" });
    } catch (error: any) {
      if (error.msg === "Unautorized Operation!") error.status = 401;
      next(error);
    }
  }

  async updateSpecialty(req: any, res: Response, next: NextFunction) {
    try {
      if (req.role !== "admin") {
        throw new Error("Unauthorized Operation!");
      }
      const specialty = await Specialty.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!specialty)
        throw new Error("Couldn't find specialty in the database!");

      res
        .status(200)
        .json({ success: true, msg: "Specialty updated succesfully!" });
    } catch (error: any) {
      if (error.msg === "Unauthorized Operation!") error.status = 401;
      next(error);
    }
  }

  async removeSpecialty(req: any, res: Response, next: NextFunction) {
    try {
      if (req.role !== "admin") {
        throw new Error("Unauthorized Operation!");
      }
      const specialty = await Specialty.findByIdAndDelete(req.params.id);
      if (!specialty)
        throw new Error("Couldn't find specialty in the database!");

      res
        .status(200)
        .json({ success: true, msg: "Specialty deleted succesfully!" });
    } catch (error: any) {
      if (error.msg === "Unauthorized Operation!") error.status = 401;
      next(error);
    }
  }

  async getSpecialties(req: Request, res: Response, next: NextFunction) {
    //-Pending Filter & Sort
    try {
      const specialties = await Specialty.find({});
      res.json({ success: true, specialties });
    } catch (error: any) {
      if (error.msg === "Unauthorized Operation!") error.status = 401;
      next(error);
    }
  }
}
