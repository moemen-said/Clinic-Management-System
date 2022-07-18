import mongoose from 'mongoose';

export type employeeDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};

const employeeSchema = new mongoose.Schema({
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
});

export const Employee = mongoose.model<employeeDocument>('Employee', employeeSchema);