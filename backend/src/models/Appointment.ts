import mongoose from 'mongoose';

enum appointmentType {
	'Consultation' = 'Consultation',
	'FollowUp' = 'FollowUp',
}

export type appointmentDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	patientId: mongoose.Types.ObjectId;
	doctorId: mongoose.Types.ObjectId;
	employeeId: mongoose.Types.ObjectId;
	specialtyId: string;
	previousAppointment?: mongoose.Types.ObjectId;
	type: appointmentType;
	date: Date;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
};

const appointmentSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	patientId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Patient',
	},
	doctorId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	employeeId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	specialtyId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Specialty',
	},
	type: {
		type: String,
		enum: ['Consultation', 'FollowUp'],
		required: true,
	},
	previousAppointment: {
		type: mongoose.Types.ObjectId,
		ref: 'Appointment',
	},
	date: {
		type: Date,
		default: Date.now,
		required: true,
	},
	notes: {
		type: String,
		required: true,
	},
});

export const Appointment = mongoose.model<appointmentDocument>('Appointment', appointmentSchema);
