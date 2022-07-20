import { Router,Request,Response,NextFunction } from "express";
import doctorController from "../controllers/doctorController";
import { body, param } from "express-validator";
import validationMW from "../middlewares/validationMW";
import isAuthenticated from "../middlewares/isAuthenticated"
import {addDoctorPermMW,updateDoctorPermMW,deleteDoctorPermMW} from "../middlewares/permissionMW"

const DoctorController = new doctorController();
const router = Router();
 
router.get('/doctors',isAuthenticated,DoctorController.getAllDoctors);
router.get('/getDoctorById',isAuthenticated,DoctorController.getDoctorById);

router.post('/doctors',[
    body("userId").isMongoId().withMessage("UserId should be a valid MongoID."),
    body("name").notEmpty().isString().withMessage("name should be a stirng and not empty.")
    // .custom(value => {
        
    //     try {
    //         const data:any = Doctor.findOne({name: value})
    //         if(!data){
    //             console.log(data)
    //             return Promise.resolve()
    //         }
    //         else{
    //             return Promise.reject('Name already taken')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    //     return Doctor.findOne({name: value})
    //        .then((data) => {
            
    //           return Promise.reject('Name already taken')
    //        }).catch(err=>console.log(err))
           
    //  })
,
    body("specialtyId").isMongoId().withMessage("specialtyId should be a valid MongoID."),
    body("examinationPrice").isNumeric().withMessage("examinationPrice should be number!"),
],isAuthenticated,addDoctorPermMW,validationMW,DoctorController.createDoctor);

router.put('/doctors/:id',[
    param("id").isMongoId().withMessage("id should be a valid MongoID."),
    body("userId").isMongoId().withMessage("UserId should be a valid MongoID."),
    body("name").isString().withMessage("Name should be text!"),
    body("specialtyId").isMongoId().withMessage("specialtyId should be a valid MongoID."),
    body("examinationPrice").isNumeric().withMessage("examinationPrice should be number!"),
],isAuthenticated,updateDoctorPermMW,validationMW,DoctorController.updateDoctor);
router.delete('/doctors/:id',param("id").isMongoId().withMessage("params id should be mongo id"),
isAuthenticated,deleteDoctorPermMW,validationMW,DoctorController.deleteDoctor);

export default router;