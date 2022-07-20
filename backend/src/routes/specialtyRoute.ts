import { Router } from "express";
const router = Router();
import { SpecialtyController } from "../controllers/specialtyContoller";
import { body, param } from "express-validator";
import validationMW from "../middlewares/validationMW";
const specialtyContoller = new SpecialtyController();
import authMW from "../middlewares/isAuthenticated";

router
  .route("/specialty")
  .get(specialtyContoller.getSpecialties)
  .post(
    authMW,
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
    authMW,
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
    authMW,
    [param("id").isMongoId().withMessage("Id should be a valid MongoID.")],
    validationMW,
    specialtyContoller.removeSpecialty
  );

export default router;
