import {Request,Response,NextFunction } from "express";
import mongoose from 'mongoose';
require("../models/user")

import Employee from '../models/employee';

export default class EmployeeController{
    constructor(){ }
    createEmployee (req:Request,res:Response,next:NextFunction) {
        const { userId,name } = req.body;

        const emp  = new Employee({
            _id: new mongoose.Types.ObjectId(),
            userId,
            name
        
        });
    
        return emp
            .save()
            .then((emp) => res.status(201).json({ emp }))
            .catch((error) => res.status(500).json({ error }));
    }


    getAllEmployee (req:Request,res:Response,next:NextFunction) {
        return Employee.find({})
            .populate({path:"userId",options:{sort:{name:-1}}})
            .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'not found' })))
            .catch((error)=>next(error));
    }

    async updateEmployee(req:Request,res:Response,next:NextFunction){
        const data:any = await Employee.findOne({_id:req.params.id})
          if(data){
           for (const property in req.body) {
               data[property] = req.body[property];
             }
           await  data.save();
           res.status(200).json({Message:"updated",data})
   
          }
       }

       async deleteEmployee(req:Request,res:Response,next:NextFunction){

        try {
            const data = await Employee.findByIdAndDelete({_id:req.params.id})
            return res.status(200).json({Message:"deleted Successful",data})
        } catch (error) {
                next(error)
        }

       }

}
