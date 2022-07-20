import { Application } from 'express';
import patientController from '../controllers/patientController';
import isAuthenticated from '../middlewares/isAuthenticated';

export default class patientRoutes {
	patientCtrl = new patientController();

	constructor(app: Application) {
		app.get('/patients', isAuthenticated,this.patientCtrl.getAllPatient);

		app.route('/patient')
		.get(isAuthenticated, this.patientCtrl.getPatientDataById)
		.post(isAuthenticated,this.patientCtrl.addPatient)
		.put(isAuthenticated,this.patientCtrl.updatePatient)
		.delete(isAuthenticated,this.patientCtrl.deletePatient)
	}
}
