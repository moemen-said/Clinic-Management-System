import { Router,Request,Response } from "express";

import employeeController from "../controllers/employeController";
const EmployeeController = new employeeController();

const router = Router();

router.post('/employee',EmployeeController.createEmployee);



export default router;



