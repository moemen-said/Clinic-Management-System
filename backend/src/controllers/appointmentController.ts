import { Request, Response, NextFunction } from "express";
import { Appointment, appointmentDocument } from "../models/Appointment";
import { Doctor } from "../models/doctor";
import moment from "moment";

export default class AppointmentController {
  constructor() {}

  private async getDoctorAppointmentsOnDay(date: Date, doctorId: String) {
    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    return await Appointment.find(
      {
        doctorId: doctorId,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
      { _id: 0, patientId: 1, type: 1, date: 1 }
    ).sort({ date: 1 });
  }

  private isOffDay(date: Date): Boolean {
    return date.toDateString().match(/^(fri|sat)/i) !== null ? true : false;
  }

  checkDoctorAppointmentsByDay = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (this.isOffDay(new Date(req.body.date)))
        throw new Error("The clinic is closed on Friday & Saturday");

      const doctor = await Doctor.findById(req.body.doctorId);
      if (!doctor) throw new Error("There is no doctor with that ID");

      const doctorAppointments = await this.getDoctorAppointmentsOnDay(
        new Date(req.body.date),
        req.body.doctorId
      );

      if (!doctorAppointments.length)
        throw new Error("No Appointments This Day!");

      res.json({ success: true, doctorAppointments });
    } catch (error) {
      next(error);
    }
  };
}
