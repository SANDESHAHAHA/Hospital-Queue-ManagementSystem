import {
    Table,
    Column,
    DataType,
    Model
} from 'sequelize-typescript'

@Table({
    modelName:"schedules",
    tableName:"Schedule",
    timestamps:true
})
// need doctor id as a foreign key
 
class Schedule extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
    })
    declare id:string

    @Column({
        type:DataType.DATEONLY,
        allowNull:false
    })
    declare date:string

    @Column({
        type:DataType.TIME,
        allowNull:false
    })
    declare startTime:string
    
    @Column({
        type:DataType.TIME,
        allowNull:false
    })
    declare endTime:string
}
export default Schedule