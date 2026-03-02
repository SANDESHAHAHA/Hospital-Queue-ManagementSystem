import { Model } from 'sequelize-typescript';
declare class Schedule extends Model {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
}
export default Schedule;
//# sourceMappingURL=Schedule.d.ts.map