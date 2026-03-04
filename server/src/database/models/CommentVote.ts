import {
    Table,
    Model,
    Column,
    DataType,
    
} from 'sequelize-typescript'
import { VoteType } from '../../globals/types/VoteTypes/voteTypes.js'

@Table({
    tableName:'commentvotes',
    modelName:'CommentVote',
    timestamps:true
})

class CommentVote extends Model{
    @Column({
        primaryKey:true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type:DataType.ENUM(...Object.values(VoteType)),
        allowNull:false
    })
    declare type : VoteType
}

export default CommentVote