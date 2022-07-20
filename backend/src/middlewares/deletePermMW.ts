import { Request, Response, NextFunction } from "express";
import Permission from "../models/permission";

export default (req: Request, res: Response, next: NextFunction) => {
//   console.log("req ----------->", req.url);
//   let permissionOn = req.url.split("/")[1]
//   console.log("permissionOn",  permissionOn);
  Permission.findOne({userId: "62d80c421345def4facee510"}).then((data:any) => {
    if(data.canDelete) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
};
