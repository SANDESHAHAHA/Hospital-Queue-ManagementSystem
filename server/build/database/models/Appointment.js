var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Model, Table, Column, DataType } from 'sequelize-typescript';
let Appointment = 
// if tow requests hits the server by the user at the same time the database enforcess uniquness that is for doctor x at date y and at time z two patients shold not book the same appointment
// doctor id as foreign key here kun doctor sanga related appointment ho 
// patient id as foreign key here  kun patient le kun doctor sanga appointment leko ho 
class Appointment extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
], Appointment.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
], Appointment.prototype, "date", void 0);
__decorate([
    Column({
        type: DataType.TIME,
        allowNull: false
    })
], Appointment.prototype, "startTime", void 0);
__decorate([
    Column({
        type: DataType.TIME,
        allowNull: false
    })
], Appointment.prototype, "endTime", void 0);
__decorate([
    Column({
        type: DataType.STRING, // to set local time else for date utc time was setting i.e. the standard time zone
        allowNull: true
    })
], Appointment.prototype, "checkInTime", void 0);
__decorate([
    Column({
        type: DataType.INTEGER,
        allowNull: true
    })
], Appointment.prototype, "queuePosition", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "booked"
    })
], Appointment.prototype, "status", void 0);
Appointment = __decorate([
    Table({
        tableName: "appointments",
        modelName: "Appointment",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["doctorId", "date", "startTime"]
            }
        ]
    })
    // if tow requests hits the server by the user at the same time the database enforcess uniquness that is for doctor x at date y and at time z two patients shold not book the same appointment
    // doctor id as foreign key here kun doctor sanga related appointment ho 
    // patient id as foreign key here  kun patient le kun doctor sanga appointment leko ho 
], Appointment);
export default Appointment;
//# sourceMappingURL=Appointment.js.map