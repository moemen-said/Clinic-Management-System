/**CREATE UPDATE REMOVE READ(WITH FILTERS & SORTING) */
import { Router } from "express";
const router = Router();
import { SpecialtyController } from "../controllers/specialtyContoller";
import { body } from "express-validator";
import validationMW from "../middlewares/validationMW";
const specialtyContoller = new SpecialtyController();

router
  .route("/specialty")
  .post(
    [
      body("name").isString().withMessage("Name should be text!"),
      body("description").isString().withMessage("Description should be text!"),
    ],
    validationMW,
    specialtyContoller.createSpecialty
  );

export default router;
