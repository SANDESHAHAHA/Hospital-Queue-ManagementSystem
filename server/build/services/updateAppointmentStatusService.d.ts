import Appointment from "../database/models/Appointment.js";
import { AppointmentStatus } from "../globals/types/AppointmentTypes/Appointment.js";
declare function updateAppointmentStatusService(appointmentId: string, status: AppointmentStatus): Promise<Appointment>;
export default updateAppointmentStatusService;
//# sourceMappingURL=updateAppointmentStatusService.d.ts.map