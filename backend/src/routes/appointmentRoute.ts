import { Router } from "express";
import { body } from "express-validator";
import AppointmentController from "../controllers/appointmentController";
import validationMW from "../middlewares/validationMW";

const router = Router();
const appointmentController = new AppointmentController();

router.route("/appointments").get(
  [
    body("doctorId")
      .isMongoId()
      .withMessage("Doctor's ID Should be a valid MongoID!"),
    // body("date").isDate().withMessage("Please provide a valid date!"),
  ],
  validationMW,
  appointmentController.checkDoctorAppointmentsByDay
);

export default router;
