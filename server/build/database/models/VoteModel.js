var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, DataType, } from 'sequelize-typescript';
import { VoteType } from '../../globals/types/VoteTypes/voteTypes.js';
let Vote = class Vote extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
], Vote.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.ENUM(...Object.values(VoteType)),
        allowNull: false
    })
], Vote.prototype, "type", void 0);
Vote = __decorate([
    Table({
        tableName: 'votes',
        modelName: 'Vote',
        timestamps: true
    })
], Vote);
export default Vote;
//# sourceMappingURL=VoteModel.js.map