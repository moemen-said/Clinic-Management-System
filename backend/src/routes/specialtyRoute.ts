/**CREATE UPDATE REMOVE READ(WITH FILTERS & SORTING) */
import { Router } from "express";
const router = Router();
import { SpecialtyController } from "../controllers/specialtyContoller";
import { body, param } from "express-validator";
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

router
  .route("/specialty/:id")
  .put(
    [
      param("id").isMongoId().withMessage("Id should be a valid MongoID."),
      body("description")
        .optional()
        .isString()
        .withMessage("Description should be text!"),
      body("name").optional().isString().withMessage("Name should be text!"),
    ],
    validationMW,
    specialtyContoller.updateSpecialty
  )
  .delete(
    [param("id").isMongoId().withMessage("Id should be a valid MongoID.")],
    validationMW,
    specialtyContoller.removeSpecialty
  );

export default router;
