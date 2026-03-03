var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Column, Model, DataType } from 'sequelize-typescript';
let Comment = 
// foreign key feed id and user id 
class Comment extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
], Comment.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.TEXT,
        allowNull: false
    })
], Comment.prototype, "text", void 0);
Comment = __decorate([
    Table({
        tableName: 'comments',
        modelName: 'Comment',
        timestamps: true
    })
    // foreign key feed id and user id 
], Comment);
export default Comment;
//# sourceMappingURL=CommentModel.js.map