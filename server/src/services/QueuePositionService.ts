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