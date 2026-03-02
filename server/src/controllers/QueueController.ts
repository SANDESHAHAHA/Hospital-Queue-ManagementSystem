import type { Request,Response } from "express";
import Doctor from "../database/models/Doctor.js";
import Appointment from "../database/models/Appointment.js";
import { Op } from "sequelize";
import { AppointmentStatus } from "../globals/types/AppointmentTypes/Appointment.js";
import updateQueuePositionService from "../services/QueuePositionService.js";

class QueueController{
    public static async getDoctorQueue(req:Request,res:Response):Promise<void>{
        const {doctorId} = req.params
        const {date} = req.body ?? {}
        if(!date){
            res.status(400).json({
                message : "Please provide date to see the queue list !"
            })
        }
        if(!doctorId){
            res.status(400).json({
                message : "Please send doctor id  !"
            })
            return
        }
        const doctor = await Doctor.findByPk(doctorId as string)
        if(!doctor){
            res.status(404).json({
                message :"Please provide valid doctor id !"
            })
            return
        }
        const avgTime = doctor.avgConsultationTime 
        if(!avgTime){
            res.status(401).json({
                message :"Doctor has not been approved or not set consultation time yet !"
            })
            return
        }
        
        // fetch active queue and ensure queue positions are assigned via service
        // repeatedly call the service to assign next available positions until none remain
        while (true) {
            const assigned = await updateQueuePositionService(doctorId as string, date as string)
            if (!assigned) break
        }

        // refetch appointments with assigned positions (fall back to checkInTime ordering)
        const appointmentsWithPositions = await Appointment.findAll({
            where: {
                doctorId,
                date,
                status: {
                    [Op.in]: [AppointmentStatus.CHECKED_IN, AppointmentStatus.IN_PROGRESS]
                }
            },
            order: [["queuePosition", "ASC"], ["checkInTime", "ASC"]]
        })

        const result = appointmentsWithPositions.map((appt, index) => {
            const position = (appt as any).queuePosition || index + 1
            const estimatedWaitMinutes = (position - 1) * avgTime
            return {
                id: appt.id,
                patientId: (appt as any).patientId,
                checkInTime: (appt as any).checkInTime,
                queuePosition: position,
                estimatedWaitMinutes
            }
        })

        res.status(200).json({ message: "Doctor queue fetched successfully", data: result })
        return

    }
}

export default QueueController