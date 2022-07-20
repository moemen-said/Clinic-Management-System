import {body,param} from 'express-validator'

// User Validations
export const onLogin = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),

	body('password')
		.notEmpty()
		.withMessage('password cannot be empty')
		.isLength({ min: 6, max: 12 })
		.withMessage('Password length must be between 6:12 characters'),
];

export const onSignup = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),

	body('role')
		.notEmpty()
		.withMessage('role cannot be empty')
		.isIn(['customer', 'business'])
		.withMessage('role must be `customer` OR `business`'),

	body('phone')
		.notEmpty()
		.withMessage('phone cannot be empty')
		.isMobilePhone('ar-EG')
		.withMessage('enter a valid phone format'),
];

export const onResetPass = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),
];

export const onSetNewPass = [
	body('userId')
		.notEmpty()
		.withMessage('userId cannot be empty')
		.isMongoId()
		.withMessage('userId must be a Mongo ObjectId'),

	body('newPassword')
		.notEmpty()
		.withMessage('password cannot be empty')
		.isLength({ min: 8, max: 12 })
		.withMessage('Password length must be between 8:12 characters'),

	body('resetToken')
		.notEmpty()
		.withMessage('resetToken cannot be empty')
		.isString()
		.withMessage('reset token must be string'),
];
