import mongoose from 'mongoose';

export type patientDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	patientId: mongoose.Types.ObjectId;
	name: {
		firstname: string;
		lastname: string;
	};
	email: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
};

const nameSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
	},
	{ _id: false }
);

const patientSchema = new mongoose.Schema({
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
	name: {
		type: nameSchema,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

export const Patient = mongoose.model<patientDocument>('Patient', patientSchema);
