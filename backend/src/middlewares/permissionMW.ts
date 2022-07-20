import { Request, Response, NextFunction } from "express";
import Permission from "../models/permission";



export const addDoctorPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !== null && data.canAddDoctor) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateDoctorPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !== null && data.canUpdateDoctor) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteDoctorPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !== null && data.canDeleteDoctor) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const addPrescriptionPermMW = (req: Request, res: Response, next: NextFunction) => {
  console.log("presc is working -------------------------------")
  Permission.findOne({userId: req.id}).then((data:any) => {
  
    console.log(data,"-----------------")
    if(data !== null && data.canAddPrescription) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updatePrescriptionPermMW = (req: Request, res: Response, next: NextFunction) => {
  console.log("update mw is working")
  Permission.findOne({userId: req.id}).then((data:any) => {
    console.log("last Data = > ", data)
    if(data !== null && data.canUpdatePrescription) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deletePrescriptionPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canDeletePrescription) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const addInvoicePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canAddInvoice) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateInvoicePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canUpdateInvoice) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteInvoicePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canDeleteInvoice) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}
export const addMedicinePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canAddMedicine) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateMedicinePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canUpdateMedicine) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteMedicinePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canDeleteMedicine) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}
export const addSpecialityPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canAddSpeciality) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateSpecialityPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canUpdateSpeciality) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteSpecialityPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canDeleteSpeciality) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const addAppointmentPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canAddAppointment) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateAppointmentPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data !==null && data.canUpdateAppointment) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteAppointmentPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: req.id}).then((data:any) => {
    if(data.canDeleteAppointment) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}
