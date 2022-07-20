import {RequestHandler} from 'express';
// import Perms from '../models/prescription';
import Permission from '../models/permission';
require("../models/user");
require("../models/user")
require("../models/permission")

export const createPermission: RequestHandler = (req, res, next) => {
    let permission = new Permission({
        userId: req.body.userId,
        canUpdate: req.body.canUpdate,
        canDelete: req.body.canDelete
    });
    permission.save().then(data => {
        res.status(200).json({success:true, message:"added"});
    }).catch(err => {
        res.status(402).json({success:false, message: "error "})
        next(err)
    })
}

export const getAllPermissions: RequestHandler = (req, res, next) => {
    Permission.find({}).then(data => {
        res.status(200).json({success:true, data})
    }).catch(err => {
        res.status(402).json({success:false, message: "error "})
        next(err)
    })
}

export const getPermissionById: RequestHandler = (req, res, next) => {
    Permission.findById({_id:req.params.id}).then(data => {
        res.status(200).json({success:true, data})
    }).catch(err => {
        res.status(402).json({success:false, message: "error "})
        next(err)
    })
}

export const updatePermission: RequestHandler = (req, res, next) => {
    Permission.findOne({_id: req.body.id}).then((data:any) => {
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

export const deletePermission: RequestHandler = (req, res, next) => {
    Permission.findByIdAndDelete({_id:req.params.id}).then(data => {
        res.status(200).json({success:true, message: "deleted successfully"});
    }).catch(err => {
        next(err)
    })
}

// update permission
