import {NextFunction, RequestHandler, Router, Request, Response} from 'express';
import { createPrescription, deletePrescription, getAllPrescriptions, getPrescriptionById, updatePrescription } from '../controllers/prescription';
import {body, param} from 'express-validator';
import validationMW from '../middlewares/validationMW';
import {addPrescriptionPermMW,  updatePrescriptionPermMW, deletePrescriptionPermMW} from '../middlewares/permissionMW'

const router = Router();


router.route("/prescription")
.post(addPrescriptionPermMW, createPrescription)
.get(getAllPrescriptions)
.put(updatePrescriptionPermMW, updatePrescription);
router.route("/prescription/:id").get(getPrescriptionById).delete(deletePrescriptionPermMW, deletePrescription);

export default router
// 62cf41becbc05c11550ecd68