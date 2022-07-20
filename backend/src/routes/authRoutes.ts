import { Application } from 'express';
import authController from '../controllers/authController';

export default class AuthRoutes {
	authCtrl = new authController();

	constructor(app: Application) {

		app.post('/auth/login',this.authCtrl.login)
		app.post('/auth/signup',this.authCtrl.signup)
		app.post('/auth/resetpassword',this.authCtrl.resetPassword)
		app.post('/auth/setpassword',this.authCtrl.setNewPassword)
	}
}
