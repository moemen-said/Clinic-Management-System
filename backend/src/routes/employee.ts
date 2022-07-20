import { Router,Request,Response } from "express";

import employeeController from "../controllers/employeController";
import { body, param } from "express-validator";
import validationMW from "../middlewares/validationMW";
import isAuthenticated from "../middlewares/isAuthenticated"

const EmployeeController = new employeeController();

const router = Router();

router.post('/employee',[
    body("userId").isMongoId().withMessage("UserId should be a valid MongoID."),
    body("name").notEmpty().isString().withMessage("name should be a stirng and not empty.")
],isAuthenticated,validationMW,EmployeeController.createEmployee);
router.get('/employee',EmployeeController.getAllEmployee);

router.put('/employee/:id',[
    param("id").isMongoId().withMessage("params id should be mongo id"),
    body("userId").isMongoId().withMessage("UserId should be a valid MongoID."),
    body("name").notEmpty().isString().withMessage("name should be a stirng and not empty.")
],isAuthenticated,validationMW,EmployeeController.updateEmployee);

router.delete('/employee/:id',param("id").isMongoId().withMessage("params id should be mongo id"),validationMW,EmployeeController.deleteEmployee);

export default router;



