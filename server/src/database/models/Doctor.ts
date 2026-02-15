import {
Table,
Model,
DataType,
Column,
} from 'sequelize-typescript'

@Table({
    tableName:'doctors',
    modelName:'Doctor',
    timestamps:true
})

class Doctor extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id : string 

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare specialization : string


    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare licenseNumber:string
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    declare isApproved:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        validate:{
            min:0,
            max:240
        },
        defaultValue : 0
    })
    declare avgConsultationTime:number
}

export default Doctor
