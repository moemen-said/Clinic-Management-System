import mongoose from "mongoose";

export type appointmentDocument = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  previousAppointment?: mongoose.Types.ObjectId;
  type: String;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    employeeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    specialtyId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Specialty",
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["consultation", "followup"],
    },
    previousAppointment: {
      type: mongoose.Types.ObjectId,
      ref: "Appointment",
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

//-MongoDB stores dates in UTC GMT:00 format, this middleware makes it GMT+2 before saving
appointmentSchema.pre("save", function (next) {
  const appointment = this;

  if (appointment.isModified("date")) {
    const hour = appointment.date.getHours();
    appointment.date = new Date(appointment.date.setHours(hour + 2));
  }
  next();
});

//-MongoDB returns date in UTC format, this funciton makes it human readable before sending the JSON object in the response
appointmentSchema.methods.toJSON = function () {
  const appointment = this;
  const responseAppointment = appointment.toObject();
  responseAppointment.date = new Date(appointment.date).toLocaleString();
  return responseAppointment;
};

export const Appointment = mongoose.model<appointmentDocument>(
  "Appointment",
  appointmentSchema
);
