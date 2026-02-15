import type { Request,Response } from "express";
import Doctor from "../database/models/Doctor.js";
import { endianness } from "node:os";
import User from "../database/models/User.js";
import { Role } from "../globals/types/Role.js";

interface IdoctorRequest extends Request {
    user:{
        id:string,
        userName:string,
        email:string,
        phoneNumber:string
    }
}


class DoctorController {
    public static async applyForDoctor(req:IdoctorRequest,res:Response):Promise<void>{
        const {specialization,licenseNumber} = req.body ?? {}
        if(!specialization || !licenseNumber  ){
            res.status(400).json({
                message:"Please provide specialization,licenseNumber,avgConsultationTime ! "
            })
            return
        }
        //check if already applied
        const existingDoctor = await Doctor.findOne({
            where:{
                userId:req.user.id
            }
        })
        
        if(existingDoctor){
            res.status(400).json({
                message:"You have already applied as a doctor !"
            })
            return
        }
        await Doctor.create({
            userId:req.user.id,
            specialization,
            licenseNumber
        })
    }
    public static async setConsultationTime(req:IdoctorRequest,res:Response):Promise<void>{
        const {avgConsultationTime} = req.body ?? {}
        const userId = req.user.id
        if(!avgConsultationTime || avgConsultationTime<= 0 || avgConsultationTime! == "number"){
            res.status(400).json({
                message:"Please provide valid consultation time !"
            })
            return
        }
        const doctor = await Doctor.findOne({
            where:{
                userId
            }
        })
        if(!doctor){
            res.status(404).json({
                message:"No doctor with that user id exists !"
            })
            return
        }
        //check if doctor has been approved already !
        if(!doctor.isApproved){
            res.status(403).json({
                message:"Doctor not approved yet !"
            })
            return;
        }

        await doctor.update({avgConsultationTime})
        
        res.status(200).json({
            message:"Doctor consultation time set successfully !",
            data:doctor
        })
    }
}

export default DoctorController