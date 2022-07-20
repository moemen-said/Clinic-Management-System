import {NextFunction, RequestHandler, Router, Request, Response} from 'express';
import { createPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from '../controllers/permission';
import addPermMW from '../middlewares/addPermMW';
import permissionMW  from '../middlewares/permissionMW';
import updatePermMW from '../middlewares/updatePermMW';

const router = Router();


router.route("/permission").post(addPermMW, createPermission).get(getAllPermissions).put(updatePermission);
router.route("/permission/:id").get(getPermissionById).delete(deletePermission);

export default router