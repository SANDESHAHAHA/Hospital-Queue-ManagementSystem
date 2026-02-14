import type { Request,Response } from "express"
import Doctor from "../database/models/Doctor.js"

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

}
export default AdminController