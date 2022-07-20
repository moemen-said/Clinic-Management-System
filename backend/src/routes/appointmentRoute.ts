import { Router } from "express";
import { body } from "express-validator";
import AppointmentController from "../controllers/appointmentController";
import validationMW from "../middlewares/validationMW";

const router = Router();
const appointmentController = new AppointmentController();

router
  .route("/appointments")
  .get(
    [
      body("doctorId")
        .isMongoId()
        .withMessage("Doctor's ID Should be a valid MongoID!"),
      body("date").isDate().withMessage("Please provide a valid date!"),
    ],
    validationMW,
    appointmentController.checkDoctorAppointmentsByDay
  )
  .post(
    [
      body("patientId")
        .isMongoId()
        .withMessage("Patient's ID Should be a valid MongoID!"),
      body("doctorId")
        .isMongoId()
        .withMessage("Doctor's ID Should be a valid MongoID!"),
      body("specialtyId")
        .isMongoId()
        .withMessage("Specialty's ID Should be a valid MongoID!"),
      body("employeeId")
        .isMongoId()
        .withMessage("Employee's ID Should be a valid MongoID!"),
      body("type")
        .toLowerCase()
        .isIn(["consultation", "followup"])
        .withMessage("Type should be text, consultation or followup"),
      body("date").isDate().withMessage("Please provide a valid date format!"),
    ],
    validationMW,
    appointmentController.createAppointment
  )
  .put(
    [
      body("appointmentId")
        .isMongoId()
        .withMessage("Appointment's ID Should be a valid MongoID!"),

      body("doctorId")
        .isMongoId()
        .withMessage("Doctor's ID Should be a valid MongoID!"),
      body("date").isDate().withMessage("Please provide a valid date format!"),
    ],
    validationMW,
    appointmentController.updateAppointment
  );

export default router;
