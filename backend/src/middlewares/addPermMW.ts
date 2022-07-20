import { Request, Response, NextFunction } from "express";
import Permission from "../models/permission";

// export default (req: Request, res: Response, next: NextFunction) => {
//   Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
//     if(data.canAdd) {
//         next();
//     } else {
//      throw new Error("you don't have permission")   
//     }
//   }).catch(err => {
//     next(err)
//   })
// };


export const addDoctorPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canAddDoctor) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateDoctorPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canUpdateDoctor) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteDoctorPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    console.log("data ------>", data  )
    if(data.canDeleteDoctor) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const addPrescriptionPermMW = (req: Request, res: Response, next: NextFunction) => {
  console.log("add presc is working")
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canAddPrescription) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updatePrescriptionPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canUpdatePrescription) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deletePrescriptionPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canDeletePrescription) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const addInvoicePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canAddInvoice) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateInvoicePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canUpdateInvoice) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteInvoicePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canDeleteInvoice) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}
export const addMedicinePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canAddMedicine) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateMedicinePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canUpdateMedicine) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteMedicinePermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canDeleteMedicine) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}
export const addSpecialityPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canAddSpeciality) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateSpecialityPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canUpdateSpeciality) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteSpecialityPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canDeleteSpeciality) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const addAppointmentPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canAddAppointment) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const updateAppointmentPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canUpdateAppointment) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}

export const deleteAppointmentPermMW = (req: Request, res: Response, next: NextFunction) => {
  Permission.findOne({userId: "62d08b33b8b8d89c7b10795a"}).then((data:any) => {
    if(data.canDeleteAppointment) {
        next();
    } else {
     throw new Error("you don't have permission")   
    }
  }).catch(err => {
    next(err)
  })
}
