import { Request, Response, NextFunction } from "express";

import { Medicine, medicineDocument } from "../models/medicine";

export default class MedicineController {
  constructor() {}

  getMedicine(req: Request, res: Response, next: NextFunction) {
    let filter = {};
    let sort: any = "";

    if (req.query.filter) {
      filter = { name: req.query.filter };
    }
    if (req.query.sort) {
      sort = req.query.sort;
    }

    Medicine.find(filter)
      .populate("name")
      .sort(sort)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => next(err));
  }

  createMedicine(req: Request, res: Response, next: NextFunction) {
    const newMedicine: medicineDocument = new Medicine(req.body);
    newMedicine
      .save()
      .then((data) =>
        res.status(200).json({ msg: "new medicine created", newMedicine })
      )
      .catch((err) => next(err));
  }

  updateMedicine(req: Request, res: Response, next: NextFunction) {
    Medicine.findOne({ _id: req.body.id })
      .then((data: any) => {
        if (data) {
          for (let prop in req.body) {
            data[prop] = req.body[prop];
          }
          return data.save().then((data: medicineDocument) => {
            res.status(200).json({
              message: "medicine updated",
              data: data,
              update: req.body,
            });
          });
        }
      })
      .catch((err) => next(err));
  }

  removeMedicine(req: Request, res: Response, next: NextFunction) {
    Medicine.deleteOne({ _id: req.params.id })
      .then((data) => {
        if (data) {
          res.status(200).json({ data });
        }
      })
      .catch((err) => next(err));
  }
}
