import {
    Model,
    Table,
    Column,
    DataType
} from 'sequelize-typescript'
import { Col } from 'sequelize/lib/utils'

@Table({
    tableName:"appointments",
    modelName:"Appointment",
    timestamps:true,
    indexes: [
    {
        unique: true,
        fields: ["doctorId", "date", "startTime"]
    }
    ]
})
// if tow requests hits the server by the user at the same time the database enforcess uniquness that is for doctor x at date y and at time z two patients shold not book the same appointment
// doctor id as foreign key here kun doctor sanga related appointment ho 
// patient id as foreign key here  kun patient le kun doctor sanga appointment leko ho 

class Appointment extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id : string

    @Column({
        type:DataType.DATEONLY,
        allowNull:false
    })
    declare date : string

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

    @Column({
        type: DataType.STRING, // to set local time else for date utc time was setting i.e. the standard time zone
        allowNull:true
    })
    declare checkInTime : string

    @Column({
        type:DataType.INTEGER,
        allowNull:true
    })
    declare queuePosition : number
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
        defaultValue:"booked"
    })
    declare status: "booked" | "completed" | "cancelled"

}
export default Appointment