var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, DataType, } from 'sequelize-typescript';
import { VoteType } from '../../globals/types/VoteTypes/voteTypes.js';
let CommentVote = class CommentVote extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
], CommentVote.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.ENUM(...Object.values(VoteType)),
        allowNull: false
    })
], CommentVote.prototype, "type", void 0);
CommentVote = __decorate([
    Table({
        tableName: 'commentvotes',
        modelName: 'CommentVote',
        timestamps: true
    })
], CommentVote);
export default CommentVote;
//# sourceMappingURL=CommentVote.js.map