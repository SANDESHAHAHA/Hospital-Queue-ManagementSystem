var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Model, DataType, Table, Column, } from 'sequelize-typescript';
import { Col } from 'sequelize/lib/utils';
let FeedPost = class FeedPost extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
], FeedPost.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    })
], FeedPost.prototype, "title", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    })
], FeedPost.prototype, "description", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    })
], FeedPost.prototype, "category", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    })
], FeedPost.prototype, "tag", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
], FeedPost.prototype, "isAnswered", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        defaultValue: null
    })
], FeedPost.prototype, "imageUrl", void 0);
FeedPost = __decorate([
    Table({
        tableName: 'feed_posts',
        modelName: 'FeedPost',
        timestamps: true
    })
], FeedPost);
export default FeedPost;
//# sourceMappingURL=Feed_posts.js.map