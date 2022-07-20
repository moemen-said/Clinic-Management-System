import { Request, Response, NextFunction } from "express";
import { Appointment, appointmentDocument } from "../models/Appointment";
import { Doctor } from "../models/doctor";
import moment, { Moment } from "moment";

export default class AppointmentController {
  constructor() {}
  /*  APPOINTMENT RULES
       -Cannot add two Appointments at the same time to one doctor.
       -Clinc Working hours start from 10 AM to 6 PM (No Work on Friday & Saturday) 
       -Doctors get 16 appointments a day, half an hour each.
       */

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

  private findNearestDate(
    date: Date,
    doctorAppointments: appointmentDocument[]
  ) {
    //-First Case: if nearst appointment is available 10 AM
    const firstAppointmentDate = moment(date).hours(10).minutes(0);
    if (
      doctorAppointments.length === 0 ||
      !moment(doctorAppointments[0].date)
        .subtract(2, "hours")
        .isSame(firstAppointmentDate)
    )
      return firstAppointmentDate.toDate().toLocaleString();

    //-Second Case: if neasrt appointment is available 5.30 PM
    const lastAppointmentDate = moment(date).hours(17).minutes(30);
    if (
      doctorAppointments.length === 15 &&
      !moment(doctorAppointments[14].date)
        .subtract(2, "hours")
        .isSame(lastAppointmentDate)
    )
      return lastAppointmentDate.toDate().toLocaleString();

    //-Third Case: an appointment in the middle of the day
    //-Since the array is sorted, we can use binary search
    let startIndex = 0;
    let endIndex = doctorAppointments.length - 1;
    while (startIndex <= endIndex) {
      const middleIndex = Math.floor((startIndex + endIndex) / 2);

      /*Correct Date should be:  Hours = Index + 10 , Minutes = (-30 * Index)
      example: fifth appointment  {Hours: 4 + 10 = 14} {Minutes: -30 * 4 = -120}, then fourth appointment is 12:00   
      */
      const correctDate = moment(date)
        .hours(middleIndex + 10)
        .subtract(30 * middleIndex, "minutes");

      const currentDate = moment(doctorAppointments[middleIndex].date).subtract(
        2,
        "hours"
      ); //-Subtract 2 hours cause of mongo-date issue

      if (moment(currentDate).isSame(correctDate)) {
        //Go right
        startIndex = middleIndex + 1;
      } else {
        //Go left
        endIndex = middleIndex - 1;
      }
    }
    const nearstDate = moment(date)
      .hours(10 + startIndex)
      .subtract(30 * startIndex, "minutes");
    if (nearstDate.isAfter(moment(date).hours(17).minutes(30)))
      throw new Error("This day is full, try another day!");

    return nearstDate.toDate().toLocaleString();
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
      const requestDate = new Date(req.body.date);

      const currentDate = new Date();
      if (moment(requestDate).isBefore(currentDate))
        throw new Error("Cannot set an appointment on a day from the past!");

      if (this.isOffDay(requestDate))
        throw new Error("The clinic is closed on Friday & Saturday");

      const doctor = await Doctor.findById(req.body.doctorId);
      if (!doctor) throw new Error("There is no doctor with that ID");

      const doctorAppointments = await this.getDoctorAppointmentsOnDay(
        requestDate,
        req.body.doctorId
      );

      if (doctorAppointments.length === 16)
        return res.json({
          success: "false",
          msg: "This day is full, Try the next day!",
        });

      let appointmentDate = this.findNearestDate(
        requestDate,
        doctorAppointments
      );

      let requestData = { ...req.body };
      requestData.date = appointmentDate;
      const newAppointment = await new Appointment(requestData);
      await newAppointment.save();

      res.json({
        success: true,
        msg: `Appointment created successfully at ${appointmentDate}`,
      });
    } catch (error) {
      next(error);
    }
  };

  updateAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const requestDate = new Date(req.body.date);

      const currentDate = new Date();
      if (moment(requestDate).isBefore(currentDate))
        throw new Error("Cannot set an appointment on a day from the past!");

      if (this.isOffDay(requestDate))
        throw new Error("The clinic is closed on Friday & Saturday");

      const doctor = await Doctor.findById(req.body.doctorId);
      if (!doctor) throw new Error("There is no doctor with that ID!");

      const doctorAppointments = await this.getDoctorAppointmentsOnDay(
        requestDate,
        req.body.doctorId
      );
      const nearstAppointment = this.findNearestDate(
        requestDate,
        doctorAppointments
      );

      const updatedAppointment = await Appointment.findById(
        req.body.appointmentId
      );

      if (!updatedAppointment)
        throw new Error("There is no appointment with that id!");

      updatedAppointment.date = new Date(nearstAppointment);
      await updatedAppointment.save();

      res.json({
        success: true,
        msg: `Appointment Updated to ${nearstAppointment}`,
      });
    } catch (error) {
      next(error);
    }
  };

  async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await Appointment.findByIdAndRemove(
        req.body.appointmentId
      );
      if (!appointment) throw new Error("Couldn't find this appointment!");
      res.json({ success: true, msg: "Appointment Deleted Successfully!" });
    } catch (error) {
      next(error);
    }
  }
}
