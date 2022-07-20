import {RequestHandler} from 'express';
import Prescription from '../models/prescription';
require("../models/patient")
// require("../models/")
require("../models/medicine")

export const createPrescription: RequestHandler = (req, res, next) => {
    let prescription = new Prescription({
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        medicines: req.body.medicines,
        notes:req.body.notes,

    });
    prescription.save().then(data => {
        res.status(200).json({success:true, message:"added"});
    }).catch(err => {
        res.status(402).json({success:false, message: "error "})
        next(err)
    })
}

export const getAllPrescriptions: RequestHandler = (req, res, next) => {
    Prescription.find({}).populate({path: "medicines",select: "name unit quantity price"}).then(data => {
        res.status(200).json({success:true, data})
    }).catch(err => {
        res.status(402).json({success:false, message: "error "})
        next(err)
    })
}

export const getPrescriptionById: RequestHandler = (req, res, next) => {
    Prescription.findById({_id:req.params.id}).then(data => {
        res.status(200).json({success:true, data})
    }).catch(err => {
        res.status(402).json({success:false, message: "error "})
        next(err)
    })
}

export const deletePrescription: RequestHandler = (req, res, next) => {
    // Checck doctor id 
    // find by id
    Prescription.deleteOne({_id:req.params.id}).then(data => {
        res.status(200).json({success:true, message: "deleted successfully"});
    }).catch(err => {
        next(err)
    })
}

export const updatePrescription: RequestHandler = (req, res, next) => {
    Prescription.findOne({_id: req.body.id}).then((data:any) => {
        if(!data) {
            res.status(404).json({success:false, message: "can't find perm"})
        } else {
            for(let prop in req.body) {
                data[prop] = req.body[prop]
            }
            return data.save().then(() => {
             res.status(201).json({sucess: true, message: "updated successfully"})
            })
        }
    }).catch(err => {
        next(err)
    })
}