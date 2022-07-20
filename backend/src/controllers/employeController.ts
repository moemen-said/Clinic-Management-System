import {Request,Response,NextFunction } from "express";
import mongoose from 'mongoose';
require("../models/user")

import Employee from '../models/employee';

export default class doctorController{
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

}
