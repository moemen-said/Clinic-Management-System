import {Request,Response,NextFunction } from "express";
import mongoose from 'mongoose';
import { body, param } from "express-validator";

require("../models/user")
require("../models/specialty")
// import {doctorDocument,Doctor} from "../models/doctor";
import Doctor from '../models/doctor';
//import User from '../models/user'


export default class doctorController{
    constructor(){ }

    
    async createDoctor (req:Request,res:Response,next:NextFunction) {
        const { userId,name,specialtyId,examinationPrice } = req.body;
        const data:any = await Doctor.findOne({name:name})
        try {
            if(!data){
                const Doc = new Doctor({
                    _id: new mongoose.Types.ObjectId(),
                    userId,
                    name,
                    specialtyId,
                    examinationPrice
                });
                await Doc.save()
                res.status(201).json({Message:"added",Doc})
            }
            else{
                throw new Error('name should be unique')
            }
        } catch (error) {
            next(error)
            
        }
     
    }

     getAllDoctors (req:Request,res:Response,next:NextFunction) {
        return Doctor.find({})
            .populate({path:"userId",options:{sort:{name:-1}},select:{_id:0,email:1}}).populate({path:"specialtyId",select:{_id:0,name:1}})
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


