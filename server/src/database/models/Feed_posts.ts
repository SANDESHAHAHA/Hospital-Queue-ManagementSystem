import {
    Model,
    DataType,
    Table,
    Column,
} from 'sequelize-typescript'
import { Col } from 'sequelize/lib/utils'

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

    @Column({
        type:DataType.STRING,
        defaultValue:null
    })
    declare imageUrl : string
}

export default FeedPost