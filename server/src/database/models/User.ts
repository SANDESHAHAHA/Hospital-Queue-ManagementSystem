import {
Table,
Column,
Model,
DataType
} from 'sequelize-typescript'
 
@Table({
    tableName:"users",
    modelName:"User",
    timestamps:true
})

class User extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id :string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare userName:string
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    declare email:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        validate:{
            len:[6,100]
        }
    })
    declare password:string

    @Column({
        type:DataType.STRING,
        defaultValue:"patient"
    })
    declare role: 'patient'|'admin'|'doctor'

    @Column({
        type:DataType.STRING,
        allowNull:false,
        validate:{
            len:[10,10]
        }
    })
    declare phoneNumber:string

    @Column({
        type:DataType.STRING,
        unique:true
    })
    declare image : string
    
    @Column({
        type:DataType.STRING,
    })
    declare OTP : string

    @Column({
        type:DataType.STRING,
    })
    declare OTPgeneratedTime : string


}

export default User