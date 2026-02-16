import { Sequelize } from "sequelize-typescript";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Appointment from "./models/Appointment.js";
import Schedule from "./models/Schedule.js";

const sequelize = new Sequelize(process.env.CONNECTION_STRING as string,{
    models:[User,Doctor,Appointment,Schedule]
})


//model relations

User.hasMany(Doctor,{foreignKey:"userId"})
Doctor.belongsTo(User,{foreignKey:"userId"})

Doctor.hasMany(Schedule,{foreignKey:"doctorId"})
Schedule.belongsTo(Doctor,{foreignKey:"doctorId"})

try {
    await sequelize.authenticate()
    console.log("database connected successfully !")

    await sequelize.sync({force:false,alter:false})
    console.log('synced !')
} catch (error) {
    console.log("Data base connection error")
    console.log("Database error",error)

}