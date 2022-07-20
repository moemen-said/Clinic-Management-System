import mongoose from 'mongoose';

export type prescriptionDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	patientId: mongoose.Types.ObjectId;
	doctorId: mongoose.Types.ObjectId;
	date: Date;
	medicines: Array<mongoose.Types.ObjectId>;
	notes: string;
	createdAt: Date;
	updatedAt: Date;
};

// d

const prescriptionSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	patientId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Patient',
	},
	doctorId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Doctor',
	},
	date: {
		type: Date,
		default: Date.now
	},
	medicines: [{type: mongoose.Types.ObjectId, ref: "Medicine"}],
	notes: {
		type: String,
		required: true,
	},
});

 const Prescription = mongoose.model<prescriptionDocument>(
	'Prescription',
	prescriptionSchema
);

export default Prescription;
