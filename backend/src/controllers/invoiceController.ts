import { Request, Response, NextFunction } from "express";

import { Invoice, invoiceDocument } from "../models/invoice";
import { Patient } from "../models/patient";
import Doctor from "../models/doctor";

export default class InvoiceController {
  constructor() {}

  getInvoice(req: Request, res: Response, next: NextFunction) {
    Invoice.find({})
      .populate({ path: "patientId", select: { name: 1 } })
      .populate({ path: "doctorId", select: { name: 1 } })
      .populate({ path: "specialtyId", select: { name: 1 } })
      .then((data) => res.status(200).json({ status: "success", data }))
      .catch((err) => next(err));
  }

  getInvoiceByPatientId(req: Request, res: Response, next: NextFunction) {
    Invoice.find({ patientId: req.params.id })
      .populate({ path: "patientId", select: { name: 1 } })
      .populate({ path: "doctorId", select: { name: 1 } })
      .populate({ path: "specialtyId", select: { name: 1 } })
      .then((data) => res.status(200).json({ status: "success", data }))
      .catch((err) => next(err));
  }

  async createInvoice(req: Request, res: Response, next: NextFunction) {
    const patient = await Patient.findOne({ _id: req.body.patientId });
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });

    if (doctor && patient) {
      const discount = patient.insuranceDiscount
        ? doctor.examinationPrice * patient.insuranceDiscount
        : 0;

      const amountAfterDiscount = doctor.examinationPrice - discount;

      const newInvoice = new Invoice({
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        specialtyId: req.body.specialtyId,
        paymentType: req.body.paymentType,
        amount: doctor.examinationPrice,
        discount: discount,
        amountAfterDiscount: amountAfterDiscount,
      });
      newInvoice
        .save()
        .then((data) =>
          res
            .status(200)
            .json({ status: "success", message: "new invoice created" })
        )
        .catch((err) => next(err));
    } else {
      res.status(500).json({ status: "fail", message: "Internal Error" });
    }
  }

  async updateInvoice(req: Request, res: Response, next: NextFunction) {
    Invoice.findOne({ _id: req.body.id })
      .then(async (data: any) => {
        if (data) {
          for (let prop in req.body) {
            if (prop === "patientId") {
              const patient = await Patient.findOne({
                _id: req.body.patientId,
              });
              const doctor = await Doctor.findOne({ _id: req.body.doctorId });

              if (doctor && patient) {
                const discount = patient.insuranceDiscount
                  ? doctor.examinationPrice * patient.insuranceDiscount
                  : 0;

                const amountAfterDiscount = doctor.examinationPrice - discount;

                data.patientId = req.body.patientId;
                data.amountAfterDiscount = amountAfterDiscount;
                data.discount = discount;
              }
            }
            if (prop === "doctorId") {
              const patient = await Patient.findOne({
                _id: req.body.patientId,
              });
              const doctor = await Doctor.findOne({ _id: req.body.doctorId });

              if (doctor && patient) {
                const discount = patient.insuranceDiscount
                  ? doctor.examinationPrice * patient.insuranceDiscount
                  : 0;

                const amountAfterDiscount = doctor.examinationPrice - discount;

                data.doctorId = req.body.doctorId;
                data.amount = doctor.examinationPrice;
                data.amountAfterDiscount = amountAfterDiscount;
                data.discount = discount;
              }
            } else {
              data[prop] = req.body[prop];
            }
          }
          return data.save().then((data: invoiceDocument) => {
            res.status(200).json({
              status: "success",
              message: "invoice updated",
            });
          });
        }
      })
      .catch((err) => next(err));
  }

  // updateInvoice(req: Request, res: Response, next: NextFunction) {
  //   Invoice.findOne({ _id: req.body.id })
  //     .then((data: any) => {
  //       if (data) {
  //         for (let prop in req.body) {
  //           data[prop] = req.body[prop];
  //         }
  //         return data.save().then((data: invoiceDocument) => {
  //           res.status(200).json({
  //             status: "success",
  //             message: "invoice updated",
  //           });
  //         });
  //       }
  //     })
  //     .catch((err) => next(err));
  // }

  removeInvoice(req: Request, res: Response, next: NextFunction) {
    Invoice.deleteOne({ _id: req.params.id })
      .then((data) => {
        if (data) {
          res.status(200).json({
            status: "success",
            message: "invoice deleted",
          });
        }
      })
      .catch((err) => next(err));
  }
}
