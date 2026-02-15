var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, DataType, Column, } from 'sequelize-typescript';
let Doctor = class Doctor extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
], Doctor.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    })
], Doctor.prototype, "specialization", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    })
], Doctor.prototype, "licenseNumber", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
], Doctor.prototype, "isApproved", void 0);
__decorate([
    Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 240
        },
        defaultValue: 0
    })
], Doctor.prototype, "avgConsultationTime", void 0);
Doctor = __decorate([
    Table({
        tableName: 'doctors',
        modelName: 'Doctor',
        timestamps: true
    })
], Doctor);
export default Doctor;
//# sourceMappingURL=Doctor.js.map