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
	resetToken?: string;
	resetTokenExpiration?: Date;
}

export interface IUserModel extends UserDocument, Document {}

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
		enum: ['reciptionist', 'doctor', 'admin'],
	},
	phone: {
		type: String,
		required: true,
	},
	resetToken: String,
	resetTokenExpiration: Date,
});

// export const User = mongoose.model<userDocument>('User', userSchema);

export default mongoose.model<IUserModel>('User', userSchema);
