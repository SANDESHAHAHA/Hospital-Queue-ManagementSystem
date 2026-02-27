import type { Request,Response } from "express";
import Schedule from "../database/models/Schedule.js";
import { Op } from "sequelize";
import Appointment from "../database/models/Appointment.js";
import { AppointmentStatus } from "../globals/types/AppointmentTypes/Appointment.js";

interface IAppointMentRequest extends Request{
    user:{
        id:string
    }
}
 
class ExtendedAppointment extends Appointment{
    declare patientId:string
}

class AppointmentController {
    public static async bookAppointMent(req:IAppointMentRequest,res:Response):Promise<void>{
       const {doctorId,date,startTime,endTime} = req.body ?? {}
        const patientId = req.user.id
        if(!patientId){
            res.status(401).json({
                Unauthorized : "user is missing in request !"
            })
            return
        }
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
                startTime : {[Op.lt]:appointMentEnd},
                endTime : {[Op.gt]: appointMentStart}
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
            startTime,
            endTime
        })
        if(!appointment){
            res.status(400).json({
                message:"could not create an appointment !"
            })
            return
        }
        res.status(201).json({
            message:"Appointment booked successfully !",
            data : appointment
        })
    } 
    //get patient appointment details 
    public static async getMyAppointmentDetails(req:IAppointMentRequest,res:Response):Promise<void>{
        const userId  = req.user.id
        if(!userId){
            res.status(404).json({
                message : " No user with that id !"
            })
            return
        }
        const data = await Appointment.findAll({
            where:{
                patientId:userId
            }
        })

        if(!data){
            res.status(404).json({
                message : "No user with id found in user table !"

            })
            return
        }
        res.status(200).json({
            message:"Appointment details of the user fetched successfully !",
            data
        })
    }
    // cancel my appointment 
    public static async cancelMyAppointment(req:IAppointMentRequest,res:Response):Promise<void>{
        const {appointmentId} = req.params 
        const userId = req.user.id
        if(!appointmentId){
            res.status(400).json({
                message : "Please provide appointment id "
            })
            return
        }

        const appointment = await Appointment.findByPk(appointmentId as string)
        if(!appointment){
            res.status(404).json({
                message : "Appointment not found !"
            })
            return
        }

        const appointmentWithPatient:ExtendedAppointment = appointment as ExtendedAppointment

        if(appointmentWithPatient.patientId !== userId){
            res.status(403).json({
                message : "You can only cancel your own appointments !"
            })
            return
        }

        if(appointment.status === AppointmentStatus.CANCELLED){
            res.status(400).json({
                message : "Appointment already cancelled!",
                data:appointment
            })
            return
        }
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`)
        const now = new Date()
        if ((appointmentDateTime.getTime()-now.getTime()) < 60*60*1000){
             res.status(400).json({
                message : " Cannot cancel within 1 hour of appointment !"
            })
            return
        }
        const data = await appointment.update({status:AppointmentStatus.CANCELLED})

        res.status(200).json({
            message : "Appointment cancelled successfully !",
            data
        })
    }
    public static async getAllAppointments(req:IAppointMentRequest,res:Response):Promise<void>{
        const data = await Appointment.findAll()
        if(!data.length){
            res.status(404).json({
                message : "No appointments found !"
            })
            return 
        }
        res.status(200).json({
            message : "Appointments fetched successfully !",
            data
        })
        return
    }
}

export default AppointmentController