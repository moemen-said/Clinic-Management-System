import {NextFunction, RequestHandler, Router, Request, Response} from 'express';
import { body, param } from 'express-validator';
import { createPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from '../controllers/permission';
import {addPrescriptionPermMW} from '../middlewares/addPermMW'
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router();


router.route("/permission")
.post([
    body("userId").notEmpty().isMongoId(),

    body("canAddPrescription").isBoolean(),
    body("canDeletePrescription").isBoolean(),
    body("canUpdatePrescription").isBoolean(),

    body("canAddAppointment").isBoolean(),
    body("canDeleteAppointment").isBoolean(),
    body("canUpdateAppointment").isBoolean(),

    body("canAddDoctor").isBoolean(),
    body("canDeleteDoctor").isBoolean(),
    body("canUpdateDoctor").isBoolean(),

    body("canAddEmployee").isBoolean(),
    body("canDeleteEmployee").isBoolean(),
    body("canUpdateEmployee").isBoolean(),

    body("canAddInvoice").isBoolean(),
    body("canDeleteInvoice").isBoolean(),
    body("canUpdateInvoice").isBoolean(),

    body("canAddMedicine").isBoolean(),
    body("canDeleteMedicine").isBoolean(),
    body("canUpdateMedicine").isBoolean(),

    body("canAddSpeciality").isBoolean(),
    body("canDeleteSpeciality").isBoolean(),
    body("canUpdateSpeciality").isBoolean(),

], isAuthenticated, createPermission).get(getAllPermissions)
.put([
   body("id").notEmpty().isMongoId().withMessage("shouldn't be empty")
], updatePermission);
router.route("/permission/:id")
.get([
    body("id").notEmpty().isMongoId()
], 
    isAuthenticated, getPermissionById).delete(deletePermission);

export default router