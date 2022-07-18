import { Router,Request,Response } from "express";
import doctorController from "../controllers/doctorController";

const DoctorController = new doctorController();
const router = Router();
 
router.get('/doctors',DoctorController.getAllDoctors);
router.get('/doctors/:id',DoctorController.getDoctorById);

router.post('/doctors',DoctorController.createDoctor);

router.put('/doctors/:id',DoctorController.updateDoctor);
router.delete('/doctors/:id',DoctorController.deleteDoctor);

export default router;