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
    canAdd: {type: Boolean, default: false},
    canUpdate: {type: Boolean, default: false},
    canDelete: {type: Boolean, default: false}
	
});

 const Permission = mongoose.model<permissionDocument>(
	'Permission',
	permissionSchmea
);

export default Permission;
