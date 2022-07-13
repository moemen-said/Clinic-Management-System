import mongoose from 'mongoose';

export type userDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	role: string;
	name: {
		firstname: string;
		lastname: string;
	};
	phone: string;
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
	name: {
		type: nameSchema,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

export const User = mongoose.model<userDocument>('User', userSchema);
