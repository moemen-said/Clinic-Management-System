import mongoose from 'mongoose';

export type prescriptionDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	patientId: mongoose.Types.ObjectId;
	doctorId: mongoose.Types.ObjectId;
	date: Date;
	medicines: Array<{
		name: string;
		unit: string;
		notes: string;
	}>;
	notes: string;
	createdAt: Date;
	updatedAt: Date;
};


const medicineSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		unit: String,
		notes: String,
	},
	{ _id: false }
);

const prescriptionSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	patientId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	doctorId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	date: {
		type: Date,
		default: Date.now,
		required: true,
	},
	medicines: {
		type: [medicineSchema],
		required: true,
	},
	notes: {
		type: Text,
		required: true,
	},
});

export const Prescription = mongoose.model<prescriptionDocument>(
	'Prescription',
	prescriptionSchema
);
