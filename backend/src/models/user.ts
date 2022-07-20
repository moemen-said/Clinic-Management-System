//import mongoose from 'mongoose';

import mongoose, { Document, Schema } from 'mongoose';


// \\export type userDocument = mongoose.Document & {
// \\	_id: mongoose.Types.ObjectId;
// \\	email: string;
// \\	password: string;
// \\ role: string;
// \\	phone: string;
// \\};



export interface UserDocument {
	
	email: string;
	password: string;
	role: string;
	name: {
		firstname: string;
		lastname: string;
	};
	phone: string;
}

export interface IUserModel extends UserDocument, Document {}


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

const userSchema: Schema = new Schema({
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

// export const User = mongoose.model<userDocument>('User', userSchema);

export default mongoose.model<IUserModel>('User', userSchema);

