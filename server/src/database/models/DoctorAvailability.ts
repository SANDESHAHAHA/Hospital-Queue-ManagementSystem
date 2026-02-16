import {
    Table,
    Model,
    DataType,
    Column
} from 'sequelize-typescript'

@Table({
    tableName:'availabilites',
    modelName:'Availability',
    timestamps:true

})

class Availability extends Model{
    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true

    })
    declare id : string
    
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare dayOfWeek : number

    @Column({
        type:DataType.TIME,
        allowNull:false

    })
    declare startTime : string

    @Column({
        type:DataType.TIME,
        allowNull:false

    })
    declare endTime : string
}