import {
    Model,
    DataType,
    Table,
    Column,
} from 'sequelize-typescript'

@Table({
    tableName:'feed_posts',
    modelName:'FeedPost',
    timestamps:true
})

class FeedPost extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare title:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare description : string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare category:string

    @Column({
        type : DataType.BOOLEAN,
        defaultValue : false
    })
    declare isAnswered : boolean
}

export default FeedPost