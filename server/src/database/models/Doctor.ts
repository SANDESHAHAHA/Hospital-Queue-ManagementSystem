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
    declare firstName:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare lastName:string

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
        type:DataType.STRING
    })
    declare isApproved:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        validate:{
            min:1,
            max:240
        }
    })
    declare avgConsultationTime:number
}

export default Doctor
