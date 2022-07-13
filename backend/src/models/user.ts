import mongoose from 'mongoose';

export type userDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	role: string;
	phone: string;
};

const userSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['reciptionist', 'doctor','pharmacist', 'admin'],
	},
	phone: {
		type: String,
		required: true,
	},
});

export const User = mongoose.model<userDocument>('User', userSchema);
