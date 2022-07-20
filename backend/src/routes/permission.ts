import {NextFunction, RequestHandler, Router, Request, Response} from 'express';
import { createPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from '../controllers/permission';
import {addPrescriptionPermMW} from '../middlewares/addPermMW'

const router = Router();


router.route("/permission").post(createPermission).get(getAllPermissions).put(updatePermission);
router.route("/permission/:id").get(getPermissionById).delete(deletePermission);

export default router