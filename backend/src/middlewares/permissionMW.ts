import { Request, Response, NextFunction } from "express";
import Permission from "../models/permission";

export default (req: Request, res: Response, next: NextFunction) => {
    let method = false;
    Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
      if(req.method == "POST") {
          method = data.canAdd;
        } else if(req.method == "DELETE") {
          method = data.canDelete;
        } else if(req.method == "UPDATE") {
            method = data.canUpdate;
        }
        console.log("permission is ", method)
    if(method) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
    next()
};
