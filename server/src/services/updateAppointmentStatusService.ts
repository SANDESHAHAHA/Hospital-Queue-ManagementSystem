import Appointment from "../database/models/Appointment.js";
import { AppointmentStatus } from "../globals/types/AppointmentTypes/Appointment.js";


async function updateAppointmentStatusService(appointmentId:string,status:AppointmentStatus){
    const appointment = await Appointment.findByPk(appointmentId)
    if(!appointment){
        throw new Error("Appointment not found !")
    }
    if(!Object.values(AppointmentStatus).includes(status)){
        throw new Error("Invalid status please send a valid status !") 
    }
    const updated = await appointment.update({status:status})
    return updated
}
export default updateAppointmentStatusService