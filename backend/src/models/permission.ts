import mongoose from 'mongoose';

export type permissionDocument = mongoose.Document & {
	_id: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
    canUpdate: boolean;
    canDelete: boolean;
};


const permissionSchmea = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
    canAddPrescription: {type: Boolean, default: false},
    canUpdatePrescription: {type: Boolean, default: false},
    canDeletePrescription: {type: Boolean, default: false},
    canAddAppointment: {type: Boolean, default: false},
    canUpdateAppointment: {type: Boolean, default: false},
    canDeleteAppointment: {type: Boolean, default: false},
    canAddDoctor: {type: Boolean, default: false},
    canUpdateDoctor: {type: Boolean, default: false},
    canDeleteDoctor: {type: Boolean, default: false},
    canAddEmployee: {type: Boolean, default: false},
    canUpdateEmployee: {type: Boolean, default: false},
    canDeleteEmployee: {type: Boolean, default: false},
    canAddInvoice: {type: Boolean, default: false},
    canUpdateInvoice: {type: Boolean, default: false},
    canDeleteInvoice: {type: Boolean, default: false},
    canAddMedicine: {type: Boolean, default: false},
    canUpdateMedicine: {type: Boolean, default: false},
    canDeleteMedicine: {type: Boolean, default: false},
    canAddSpeciality: {type: Boolean, default: false},
    canUpdateSpeciality: {type: Boolean, default: false},
    canDeleteSpeciality: {type: Boolean, default: false},	
});

 const Permission = mongoose.model<permissionDocument>(
	'Permission',
	permissionSchmea
);

export default Permission;
