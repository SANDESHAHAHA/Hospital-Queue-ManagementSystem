import { Op } from "sequelize"
import Appointment from "../database/models/Appointment.js"
import { AppointmentStatus } from "../globals/types/AppointmentTypes/Appointment.js"


const updateQueuePositionService =async(doctorId:string,date:string) =>{
    
    const lastPosition:number = await Appointment.max('queuePosition',{
        where:{
            doctorId,
            date,
            status:{
                [Op.in]:[AppointmentStatus.CHECKED_IN,AppointmentStatus.IN_PROGRESS]
            }
        }
    })
    
    const newPosition = (lastPosition || 0 )  + 1
    // pick the earliest checked-in appointment without a queuePosition and assign newPosition
    const target = await Appointment.findOne({
        where: {
            doctorId,
            date,
            status: AppointmentStatus.CHECKED_IN,
            queuePosition: null
        },
        order: [['checkInTime', 'ASC']]
    })

    if (!target) return null

    const updated = await target.update({ queuePosition: newPosition })
    return updated
}

export default updateQueuePositionService

export const resequenceQueuePositions = async (doctorId: string, date: string) => {
    const appointments = await Appointment.findAll({
        where: {
            doctorId,
            date,
            status: {
                [Op.in]: [AppointmentStatus.CHECKED_IN, AppointmentStatus.IN_PROGRESS]
            }
        },
        order: [['checkInTime', 'ASC']]
    })

    for (let i = 0; i < appointments.length; i++) {
        const appt = appointments[i]
        const desiredPosition = i + 1
        if (!appt) continue
        try {
            await appt.update({ queuePosition: desiredPosition })
        } catch (err) {
            // ignore individual update failures, but continue
        }
    }

    return appointments.length
}