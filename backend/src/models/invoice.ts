import mongoose from 'mongoose';

enum invoiceType {
	Cash = 'Cash',
	Credit = 'Credit',
	Insurance = 'Insurance',
}

export type invoiceDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	patientId: mongoose.Types.ObjectId;
	type: invoiceType;
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
	type: {
		type: String,
		enum: [invoiceType.Cash, invoiceType.Credit, invoiceType.Insurance],
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
});

export const Invoice = mongoose.model<invoiceDocument>('Invoice', invoiceSchema);
