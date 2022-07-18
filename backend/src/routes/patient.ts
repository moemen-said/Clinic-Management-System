import { Application } from 'express';
import patientController from '../controllers/patient';

export default class patientRoutes {
	patientCtrl = new patientController();

	constructor(app: Application) {
		app.get('/patients', this.patientCtrl.getAllPatient);
		app.post('/patient/add', this.patientCtrl.addPatient);
	}
}
