import {NextFunction, RequestHandler, Router, Request, Response} from 'express';
import { createPrescription, deletePrescription, getAllPrescriptions, getPrescriptionById } from '../controllers/prescription';

const router = Router();

// router.route("/prescription").get((req:Request, res:Response, next) => {
//     res.status(200).json({message:"dwfe"});
// })

router.route("/prescription").post(createPrescription).get(getAllPrescriptions);
router.route("/prescription/:id").get(getPrescriptionById).delete(deletePrescription);

export default router
// 62cf41becbc05c11550ecd68