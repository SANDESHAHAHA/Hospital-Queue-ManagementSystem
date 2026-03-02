import { Model } from 'sequelize-typescript';
declare class Appointment extends Model {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    checkInTime: string;
    queuePosition: number;
    status: "booked" | "completed" | "cancelled";
}
export default Appointment;
//# sourceMappingURL=Appointment.d.ts.map