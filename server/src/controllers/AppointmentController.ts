import type { Request,Response } from "express";
import Schedule from "../database/models/Schedule.js";
import { Op } from "sequelize";
import Appointment from "../database/models/Appointment.js";

interface IAppointMentRequest extends Request{
    user:{
        id:string
    }
}

class AppointmentController {
    public static async bookAppointMent(req:IAppointMentRequest,res:Response):Promise<void>{
        const {doctorId,date,startTime,endTime} = req.body ?? {}
        const patientId = req.user.id
        if(!doctorId || !date || !startTime || !endTime){
            res.status(404).json({
            message : "doctorId , date ,startTime , end Time are required !"

            })
            return
        }
        const now = new Date()
        const appointMentStart = new Date(`${date}T${startTime}`) // T is added so that js time strings can be compared correctly !
        const appointMentEnd = new Date(`${date}T${endTime}`)

        // prevent past bookings 
        if(appointMentStart <= now){
            res.status(404).json({
                message : "Cannot book appointment in the past !"
            })
            return 
        }
        //validate time range 
        if(appointMentEnd <= appointMentStart){
            res.status(400).json({
                message : "End time must be after start time !"
            })
            return
        }
        // check doctor availability to book an appointment 
        const availability = await Schedule.findOne({
            where:{
                doctorId,
                date,
                startTime : {[Op.lte]:startTime},
                endTime :{[Op.gte]:endTime}
            }
        })
        if(!availability){
            res.status(400).json({
                message : "Doctor is not available at this time !"
            })
            return
        }
        // prevent double booking 
        const overLappingAppointment = await Appointment.findOne({
            where:{
                doctorId,
                date,
                startTime : {[Op.lt]:endTime},
                endTime : {[Op.gt]: startTime}
            }
        })
        if(overLappingAppointment){
            res.status(400).json({
                message:"Time slot already booked !"
            })
            return
        }
        // create Appointment 
        const appointment = await Appointment.create({
            doctorId,
            patientId,
            date,
            startTime,endTime
        })
        res.status(201).json({
            message:"Appointment booked successfully !",
            data : appointment
        })
    }
}

export default AppointmentController