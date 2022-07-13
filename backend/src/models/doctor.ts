import mongoose from 'mongoose';

export type doctorDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
	name: string;
	specialtyId: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
};

const doctorSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
        ref:'User'
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	specialtyId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Specialty',
	},
});

export const Doctor = mongoose.model<doctorDocument>('Doctor', doctorSchema);