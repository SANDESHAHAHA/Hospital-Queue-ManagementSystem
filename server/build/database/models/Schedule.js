var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Column, DataType, Model } from 'sequelize-typescript';
let Schedule = 
// need doctor id as a foreign key
class Schedule extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
], Schedule.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
], Schedule.prototype, "date", void 0);
__decorate([
    Column({
        type: DataType.TIME,
        allowNull: false
    })
], Schedule.prototype, "startTime", void 0);
__decorate([
    Column({
        type: DataType.TIME,
        allowNull: false
    })
], Schedule.prototype, "endTime", void 0);
Schedule = __decorate([
    Table({
        modelName: "schedules",
        tableName: "Schedule",
        timestamps: true
    })
    // need doctor id as a foreign key
], Schedule);
export default Schedule;
//# sourceMappingURL=Schedule.js.map