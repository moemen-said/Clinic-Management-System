import { Request, Response, NextFunction } from "express";
import Permission from "../models/permission";

export default (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canAdd) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
};
