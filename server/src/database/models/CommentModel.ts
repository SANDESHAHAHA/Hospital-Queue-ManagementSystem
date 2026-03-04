import {Table,Column,Model,DataType} from 'sequelize-typescript'

@Table({
    tableName:'comments',
    modelName:'Comment',
    timestamps:true
})

// foreign key feed id and user id 

class Comment extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type  : DataType.TEXT,
        allowNull : false
    })
    declare text : string
}

export default Comment