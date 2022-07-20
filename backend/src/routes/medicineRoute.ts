import { Router } from "express";
import MedicineController from "../controllers/medicineController";
import validationMW from "../middlewares/validationMW";
import { body, param } from "express-validator";

const router = Router();

const medicineController = new MedicineController();

router
  .route("/medicines")
  .get(medicineController.getMedicine)
  .post(
    [
      body("name").isString().withMessage("medicine name should be characters"),
      body("unit").isString().withMessage("medicine unit should be characters"),
      body("description")
        .isString()
        .withMessage("medicine description should be characters"),
      body("expireDate")
        .isDate()
        .withMessage("medicine expireDate should be date"),

      body("quantity")
        .isNumeric()
        .withMessage("medicine quantity should be numeric"),
      body("price").isNumeric().withMessage("medicine price should be numeric"),
    ],
    validationMW,
    medicineController.createMedicine
  )
  .put(
    [
      body("id").isMongoId().withMessage("medicine id should be mongo id"),
      body("name")
        .optional()
        .isString()
        .withMessage("medicine name should be characters"),
      body("unit")
        .optional()
        .isString()
        .withMessage("medicine unit should be characters"),
      body("description")
        .optional()
        .isString()
        .withMessage("medicine description should be characters"),
      body("expireDate")
        .optional()
        .isDate()
        .withMessage("medicine expireDate should be date"),

      body("quantity")
        .optional()
        .isNumeric()
        .withMessage("medicine quantity should be numeric"),
      body("price")
        .optional()
        .isNumeric()
        .withMessage("medicine price should be numeric"),
    ],
    validationMW,
    medicineController.updateMedicine
  );

router
  .route("/medicines/:id")
  .delete(
    param("id").isMongoId().withMessage("medicine id should be mongo id"),
    validationMW,
    medicineController.removeMedicine
  );

export default router;
