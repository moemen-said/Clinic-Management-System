//import mongoose from 'mongoose';
import mongoose, { Document, Schema } from 'mongoose';


export interface doctorDocument {
	userId: string;
	specialtyId:string;
	username: string;
	createdAt: Date;
	updatedAt: Date;
}
// export type doctorDocument = mongoose.Document & {
// 	_id: mongoose.Types.ObjectId;
// 	userId: mongoose.Types.ObjectId;
// 	username: string;
// 	specialtyId: mongoose.Types.ObjectId;
// 	createdAt: Date;
// 	updatedAt: Date;
// };
export interface IDoctorModel extends doctorDocument, Document {}

const doctorSchema: Schema = new Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	userId: {
		
			type: Schema.Types.ObjectId, 
			required: true,
			 ref: 'User' 
			
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	specialtyId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Specialty',
	},
},
{
	timestamps:true
});

// export const Doctor = mongoose.model<IDoctorModel>('Doctor', doctorSchema);

export default mongoose.model<IDoctorModel>('Doctor', doctorSchema);
