import mongoose, { Document, Schema } from 'mongoose';

export interface employeeDocument {
	userId: string;
	specialtyId: string;
	name: string;
	examinationPrice:number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IEmployeeModel extends employeeDocument, Document {}


const employeeSchema: Schema = new Schema(
	{
		_id: {
			type: mongoose.Types.ObjectId,
			required: true,
			auto: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
			unique: true,
		}

	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IEmployeeModel>('Employee', employeeSchema);
