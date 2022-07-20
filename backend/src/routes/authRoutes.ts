import { Application } from 'express';

import authController from '../controllers/authController';
import * as validators from '../validators/authValidators'

export default class AuthRoutes {
	authCtrl = new authController();

	constructor(app: Application) {

		app.post('/auth/login',validators.onLogin,this.authCtrl.login)
		app.post('/auth/signup',validators.onSignup,this.authCtrl.signup)
		app.post('/auth/resetpassword',validators.onResetPass,this.authCtrl.resetPassword)
		app.post('/auth/setpassword',validators.onSetNewPass,this.authCtrl.setNewPassword)
	}
}
