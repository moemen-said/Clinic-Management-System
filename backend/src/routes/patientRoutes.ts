import { Application } from 'express';

import patientController from '../controllers/patientController';
import isAuthenticated from '../middlewares/isAuthenticated';
import * as validators from '../validators/patientValidators';

export default class patientRoutes {
	patientCtrl = new patientController();

	constructor(app: Application) {

		app.get('/patients', isAuthenticated, this.patientCtrl.getAllPatient);
		app.route('/patient')
			.get(isAuthenticated, validators.onGetPatientData, this.patientCtrl.getPatientDataById)
			.post(isAuthenticated, validators.onAddPatient, this.patientCtrl.addPatient)
			.put(isAuthenticated, validators.onUpdatePatient, this.patientCtrl.updatePatient)
			.delete(isAuthenticated, validators.onDeletePatient, this.patientCtrl.deletePatient);
	}
}
