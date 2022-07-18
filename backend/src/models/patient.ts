import mongoose from 'mongoose';

export type patientDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	name:string;
	email: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
};


const patientSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	name:{
		type:String,
		required:true
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
