const { validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const message = result.errors.reduce(
      (current: any, error: any) => current + error.msg + " ",
      ""
    );
    const error = new Error(message);
    error.status = 400;
    throw error;
  }
  next();
};
