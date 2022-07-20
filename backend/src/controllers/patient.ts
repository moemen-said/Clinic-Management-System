// import { RequestHandler } from 'express';
// import { SortOrder } from 'mongoose';

// import { Patient } from '../models/patient';
// import { Appointment, appointmentDocument } from '../models/Appointment';
// import { Prescription, prescriptionDocument } from '../models/prescription';
// import { Invoice, invoiceDocument } from '../models/invoice';

// export default class patientController {
// 	constructor() {}

// 	public addPatient: RequestHandler = (req, res, next) => {
// 		const { name, email, phone } = req.body;
// 		Patient.create({
// 			name: name,
// 			email: email,
// 			phone: phone,
// 		})
// 			.then((patient) => {
// 				res.status(201).json({ status: true, message: 'patient added successfuly' });
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					status: false,
// 					message: 'something went wrong,please try again',
// 				});
// 				next(err);
// 			});
// 	}; // end addPatient

// 	public updatePatient: RequestHandler = (req, res, next) => {
// 		Patient.findOne({ email: req.body.email })
// 			.then((patient: any) => {
// 				if (!patient)
// 					res.status(404).json({
// 						sucess: false,
// 						message: 'No patient found with this email',
// 					});
// 				else {
// 					for (let key in req.body) {
// 						patient[key] = req.body[key];
// 					}
// 					return patient.save().then(() => {
// 						res.status(201).json({
// 							status: true,
// 							message: 'patient updated successfuly',
// 						});
// 					});
// 				}
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					status: false,
// 					message: 'something went wrong,please try again',
// 				});
// 				next(err);
// 			});
// 	}; // end updatePatient

// 	public deletePatient: RequestHandler = (req, res, next) => {
// 		Patient.findOne({ email: req.body.email })
// 			.then((patient) => {
// 				if (!patient)
// 					res.status(404).json({
// 						sucess: false,
// 						message: 'No patient found with this email',
// 					});
// 				else {
// 					patient.remove().then(() => {
// 						res.status(200).json({
// 							sucess: true,
// 							message: 'patient data has been removed successfuly',
// 						});
// 					});
// 				}
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					status: false,
// 					message: 'something went wrong,please try again',
// 				});
// 				next(err);
// 			});
// 	}; // end remove patient

// 	public getPatientDataById: RequestHandler = async (req, res, next) => {
// 		let appointmentsArr: appointmentDocument[] = [],
// 			prescriptionsArr: prescriptionDocument[] = [],
// 			invoicesArr: invoiceDocument[] = [];

// 		try {
// 			// get patient data
// 			await Patient.findOne({ patientId: req.body.patientId }).then(async (patient) => {
// 				if (!patient)
// 					res.status(404).json({
// 						success: false,
// 						messgae: 'no patient found with this id',
// 					});
// 				else {
// 					// get patient appointment
// 					await Appointment.find({ patientId: req.body.patientId }).then(
// 						(appointments) => {
// 							appointmentsArr = appointments;
// 						}
// 					);

// 					// get patient prescriptions
// 					await Prescription.find({ patientId: req.body.patiendId }).then(
// 						(prescriptions) => {
// 							prescriptionsArr = prescriptions;
// 						}
// 					);

// 					// get patient invoices
// 					await Invoice.find({ patientId: req.body.patiendId }).then((invoices) => {
// 						invoicesArr = invoices;
// 					});

// 					res.status(200).json({
// 						name: patient.name,
// 						email: patient.email,
// 						phone: patient.phone,
// 						appointments: appointmentsArr,
// 						prescriptions: prescriptionsArr,
// 						invoices: invoicesArr,
// 					});
// 				}
// 			});
// 		} catch (err) {
// 			res.status(500).json({ success: false, error: 'Internal error' + err });
// 			next(err);
// 		}
// 	}; // end get patient data by id

// 	public getPatientByname: RequestHandler = async (req, res, next) => {
// 		try {
// 			// get patient data
// 			await Patient.find({ name: req.body.name }).then(async (patients) => {
// 				if (!patients)
// 					res.status(404).json({
// 						success: false,
// 						messgae: 'no patient found with this id',
// 					});
// 				else {
// 					res.status(200).json({
// 						patients: patients,
// 					});
// 				}
// 			});
// 		} catch (err) {
// 			res.status(500).json({ success: false, error: 'Internal error' + err });
// 			next(err);
// 		}
// 	}; // end get patient by name

// 	public getAllPatient: RequestHandler = (req, res, next) => {
// 		//only sort by name exist for patients
// 		let sortByCreteria: SortOrder = 1;
// 		if (req.query.sortBy) {
// 			const parts: any[] = req.query.sortBy.toString().split(':');
// 			sortByCreteria = parts[1] ? parts[1] : 1;
// 		}
		
// 		Patient.find()
// 			.sort({ name: sortByCreteria })
// 			.then((patients) => {
// 				res.status(201).json({
// 					success: true,
// 					data: patients,
// 				});
// 			})
// 			.catch((err) => {
// 				res.status(404).json({
// 					success: false,
// 					message: 'Bad request',
// 				});
// 				next(err);
// 			});
// 	}; // end get all patient with sort
// }
