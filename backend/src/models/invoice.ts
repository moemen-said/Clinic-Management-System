import mongoose from 'mongoose';

enum invoicePaymentType {
	Cash = 'Cash',
	Credit = 'Credit',
	Insurance = 'Insurance',
}

export type invoiceDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	patientId: mongoose.Types.ObjectId;
	type: invoicePaymentType;
	amount: Number;
	createdAt: Date;
	updatedAt: Date;
};

const invoiceSchema = new mongoose.Schema({
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
	doctorId:{
		type:mongoose.Types.ObjectId,
		required:true,
		ref:'Doctor'
	},
	specialtyId:{
		type:mongoose.Types.ObjectId,
		required:true,
		ref:'Specialty'
	},
	paymentType: {
		type: String,
		enum: [invoicePaymentType.Cash, invoicePaymentType.Credit, invoicePaymentType.Insurance],
		required: true,
	},
	amount: { // doctor examinationPrice
		type: Number,
		required: true,
	},
	discount:{ // insurance percentage * doctor examinationPrice
		type: Number,
		required: false,
	},
	amountAfterDiscount:{ 
		type: Number,
		required: false,
	}
});

export const Invoice = mongoose.model<invoiceDocument>('Invoice', invoiceSchema);
