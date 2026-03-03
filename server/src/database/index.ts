import { Sequelize } from "sequelize-typescript";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Appointment from "./models/Appointment.js";
import Schedule from "./models/Schedule.js";
import FeedPost from "./models/Feed_posts.js";
import Vote from "./models/VoteModel.js";
import Comment from "./models/CommentModel.js";

const sequelize = new Sequelize(process.env.CONNECTION_STRING as string,{
    models:[User,Doctor,Appointment,Schedule,FeedPost,Vote,Comment]
})


//model relations

User.hasMany(Doctor,{foreignKey:"userId"})
Doctor.belongsTo(User,{foreignKey:"userId"})

Doctor.hasMany(Schedule,{foreignKey:"doctorId"})
Schedule.belongsTo(Doctor,{foreignKey:"doctorId"})

Doctor.hasMany(Appointment,{foreignKey:"doctorId"})
Appointment.belongsTo(Doctor,{foreignKey:"doctorId"})

User.hasOne(Appointment,{foreignKey:"patientId"})
Appointment.belongsTo(User,{foreignKey:"patientId"})

User.hasMany(FeedPost,{foreignKey:'userId'})
FeedPost.belongsTo(User,{foreignKey:'userId'})

User.hasMany(Comment,{foreignKey:'commentId'})
Comment.belongsTo(User,{foreignKey:'commentId'})

FeedPost.hasMany(Comment,{foreignKey:'feedId'})
Comment.belongsTo(FeedPost,{foreignKey:'feedId'})

User.hasOne(Vote,{foreignKey:'userId'})
Vote.belongsTo(User,{foreignKey:'userId'})

FeedPost.hasMany(Vote,{foreignKey:"feedId"})
Vote.belongsTo(FeedPost,{foreignKey:'feedId'})

Comment.hasMany(Vote,{foreignKey:'commentId'})
Vote.belongsTo(Comment,{foreignKey:'commentId'})

try {
    await sequelize.authenticate()
    console.log("database connected successfully !")

    await sequelize.sync({force:false,alter:true})
    console.log('synced !')

} catch (error) {
    console.log("Data base connection error")
    console.log("Database error",error)

}