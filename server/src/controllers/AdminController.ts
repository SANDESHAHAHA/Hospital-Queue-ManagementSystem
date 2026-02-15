import type { Request,Response } from "express"
import Doctor from "../database/models/Doctor.js"
import User from "../database/models/User.js"
import { Role } from "../globals/types/Role.js"

class ExtendedDoctor extends Doctor {
    declare userId : string
}
class AdminController {
    public static async viewApprovedDoctors(req:Request,res:Response):Promise<void>{
        const data = await Doctor.findAll({
            where:{
                isApproved:true
            }
        })
        if(data.length<=0){
            res.status(404).json({
               message: "No approved doctors found "
            })
            return
        }
        res.status(200).json({
            message:"Approved doctors data fetched successfully !",
            data
        })
    }
    public static async getAppliedDoctors(req:Request,res:Response):Promise<void>{
        const data = await Doctor.findAll()
        if(data.length<=0){
            res.status(400).json({
                message:"No doctors have applied for the post !",
                data
            })
            return
        }
        res.status(200).json({
            message:"Available doctor applicants data fetched successfully !",
            data
        })
    }
    public static async approveDoctor(req:Request,res:Response):Promise<void>{
        const {doctorId} = req.params ?? {}
        if(!doctorId){
            res.status(400).json({
                message:"Please provide doctor id to update the role"   
            })
            return
        }
        const doctor = await Doctor.findByPk(doctorId as string)
        const extendedDoctor:ExtendedDoctor = doctor as ExtendedDoctor 

        if(!doctor){
            res.status(404).json({
                message:"No doctor with that id found in doctor table !"

            })
            return
        }
        if(doctor.isApproved){
            res.status(400).json({
               message:"Doctor is already available to treat patient!" 
            }) 
            return
        }
        await doctor.update({
            isApporved : true
        })
        

        await User.update({
           role:Role.Doctor
        },{
            where:{
                id : extendedDoctor.userId
            }
        })
        res.status(200).json({
            message : "Doctor approved successfully !"
        })
    }
}
export default AdminController