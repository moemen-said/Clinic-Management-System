import mongoose from 'mongoose';

export type specialtyDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	name: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
};

const specialtySchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
});

export const Specialty = mongoose.model<specialtyDocument>('Specialty', specialtySchema);
