import { Model } from 'sequelize-typescript';
declare class Appointment extends Model {
    id: string;
    date: string;
    time: string;
    status: "booked" | "completed" | "cancelled";
}
export default Appointment;
//# sourceMappingURL=Appointment.d.ts.map