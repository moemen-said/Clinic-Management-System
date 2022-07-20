import { body, param } from 'express-validator';

// User Validations
export const onGetPatientData = [
	body('patientId')
		.notEmpty()
		.withMessage('patientId cannot be empty')
		.isMongoId()
		.withMessage('Enter a valid patientId format'),
];

export const onAddPatient = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),

	body('name')
		.notEmpty()
		.withMessage('name cannot be empty')
		.isString()
		.withMessage('name must be string'),

	body('phone')
		.notEmpty()
		.withMessage('phone cannot be empty')
		.isMobilePhone('ar-EG')
		.withMessage('enter a valid phone format'),

	body('haveInsurance')
		.notEmpty()
		.withMessage('haveInsurance cannot be empty')
		.isBoolean()
		.withMessage('haveInsurance must be boolean'),

	body('insuranceCompany').optional().isString().withMessage('insuranceCompany must be string'),

	body('insuranceDiscount')
		.optional()
		.isNumeric()
		.withMessage('insuranceDiscount must be number'),
];

export const onUpdatePatient = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),

	body('name').optional().isString().withMessage('name must be string'),

	body('phone').optional().isMobilePhone('ar-EG').withMessage('enter a valid phone format'),

	body('haveInsurance').optional().isBoolean().withMessage('haveInsurance must be boolean'),

	body('insuranceCompany').optional().isString().withMessage('insuranceCompany must be string'),

	body('insuranceDiscount')
		.optional()
		.isNumeric()
		.withMessage('insuranceDiscount must be number'),
];

export const onDeletePatient = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),
];
