import { Router } from "express";

import InvoiceController from "../controllers/invoiceController";
import validationMW from "../middlewares/validationMW";
import { body, param } from "express-validator";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

const invoiceController = new InvoiceController();

router
  .route("/invoices")
  .get(isAuthenticated, invoiceController.getInvoice)
  .post(
    isAuthenticated,
    [
      body("patientId")
        .isMongoId()
        .withMessage("patient id should be mongo id"),
      body("doctorId").isMongoId().withMessage("doctor id should be mongo id"),
      body("specialtyId")
        .isMongoId()
        .withMessage("speciality id should be mongo id"),
      body("paymentType")
        .isString()
        .withMessage("payment type should be string"),
      body("amount").isNumeric().withMessage("amount should be number"),
      body("discount")
        .optional()
        .isNumeric()
        .withMessage("discount should be number"),
      body("amountAfterDiscount")
        .optional()
        .isNumeric()
        .withMessage("amount after discount should be number"),
    ],
    validationMW,
    invoiceController.createInvoice
  )
  .put(
    isAuthenticated,
    [
      body("id").isMongoId().withMessage("invoice id should be mongo id"),
      body("patientId")
        .optional()
        .isMongoId()
        .withMessage("patient id should be mongo id"),
      body("doctorId")
        .optional()
        .isMongoId()
        .withMessage("doctor id should be mongo id"),
      body("specialtyId")
        .optional()
        .isMongoId()
        .withMessage("speciality id should be mongo id"),
      body("paymentType")
        .optional()
        .isString()
        .withMessage("payment type should be string"),
      body("amount")
        .optional()
        .isNumeric()
        .withMessage("amount should be number"),
      body("discount")
        .optional()
        .isNumeric()
        .withMessage("discount should be number"),
      body("amountAfterDiscount")
        .optional()
        .isNumeric()
        .withMessage("amount after discount should be number"),
    ],
    validationMW,
    invoiceController.updateInvoice
  );

router
  .route("/invoices/:id")
  .get(
    isAuthenticated,
    param("id").isMongoId().withMessage("patient id should be mongo id"),
    validationMW,
    invoiceController.getInvoiceByPatientId
  )
  .delete(
    isAuthenticated,
    param("id").isMongoId().withMessage("invoice id should be mongo id"),
    validationMW,
    invoiceController.removeInvoice
  );

export default router;
