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

  createAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (this.isOffDay(new Date(req.body.date)))
        throw new Error("The clinic is closed on Friday & Saturday");

      const doctor = await Doctor.findById(req.body.doctorId);
      if (!doctor) throw new Error("There is no doctor with that ID");

      const currentDate = new Date();
      const requestDate = new Date(req.body.date);
      if (moment(requestDate).isBefore(currentDate))
        throw new Error("Cannot set an appointment on a day from the past!");

      /* ADDING APPOINTMENT
       -Cannot add two Appointments at the same time to one doctor.
       -Clinc Working hours start from 10 AM to 6 PM (No Work on Friday & Saturday) 
       -Doctors get 16 appointments a day, half an hour each.
       */

      const doctorAppointments = await this.getDoctorAppointmentsOnDay(
        new Date(req.body.date),
        req.body.doctorId
      );

      let appointmentDate: Date;
      switch (doctorAppointments.length) {
        case 0:
          //-Doctor has no appointments yet on this day, create first appointment of the day at 10:00:00 AM.
          appointmentDate = moment(new Date(req.body.date))
            .hour(10)
            .minute(0)
            .second(0)
            .toDate();
          break;

        case 16:
          return res.json({
            success: "false",
            msg: "This day is full, Try the next day!",
          });

        default:
          //-Doctor has 1 or more appointments, get last one and add 30minutes
          const lastAppointmentThisDay =
            doctorAppointments[doctorAppointments.length - 1].date;
          //-Date is returned as GMT+2, Subtract 2 hours to convert it to GMT
          appointmentDate = moment(lastAppointmentThisDay)
            .subtract(2, "hours")
            .add(30, "minutes")
            .toDate();
      }

      let requestData = { ...req.body };
      requestData.date = appointmentDate;
      const newAppointment = await new Appointment(requestData);
      await newAppointment.save();

      res.json({
        success: true,
        msg: `Appointment created successfully at ${appointmentDate
          .toUTCString()
          .replace(" GMT", "")}`,
      });
    } catch (error) {
      next(error);
    }
  };
}
