import {Request,Response,NextFunction } from "express";
import mongoose from 'mongoose';
require("../models/user")

// import {doctorDocument,Doctor} from "../models/doctor";
import Doctor from '../models/doctor';
//import User from '../models/user'


export default class doctorController{
    constructor(){ }

    
     createDoctor (req:Request,res:Response,next:NextFunction) {
        const { userId,username,specialtyId } = req.body;

        const Doc = new Doctor({
            _id: new mongoose.Types.ObjectId(),
            userId,
            username,
            specialtyId
        });
    
        return Doc
            .save()
            .then((Doc) => res.status(201).json({ Doc }))
            .catch((error) => res.status(500).json({ error }));
    }

     getAllDoctors (req:Request,res:Response,next:NextFunction) {
        return Doctor.find({})
            .populate({path:"userId",options:{sort:{username:-1}}})
            .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'not found' })))
            .catch((error)=>next(error));
    }
    async getDoctorById (req:Request,res:Response,next:NextFunction) {
        try {
          
            const data = await Doctor.findById({_id:req.params.id})//.populate({path:"userId"});
            res.status(200).json(data)
        } catch (error) {
            next(error);
        }
    }

   async updateDoctor(req:Request,res:Response,next:NextFunction){
     const data:any = await Doctor.findOne({_id:req.params.id})
       if(data){
        for (const property in req.body) {
            data[property] = req.body[property];
          }
        await  data.save();
        res.status(200).json({Message:"updated",data})

       }
    }


    async deleteDoctor(req:Request,res:Response,next:NextFunction){

        try {
            const data = await Doctor.findByIdAndDelete({_id:req.params.id})
            return res.status(200).json({Message:"deleted Successful",data})
        } catch (error) {
                next(error)
        }

       }
}


