import { Sequelize } from "sequelize-typescript";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Appointment from "./models/Appointment.js";
import Schedule from "./models/Schedule.js";
import FeedPost from "./models/Feed_posts.js";
import Vote from "./models/FeedVote.js";
import Comment from "./models/CommentModel.js";
import CommentVote from "./models/CommentVote.js";
const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    models: [User, Doctor, Appointment, Schedule, FeedPost, Vote, Comment, CommentVote]
});
//model relations
User.hasMany(Doctor, { foreignKey: "userId" });
Doctor.belongsTo(User, { foreignKey: "userId" });
Doctor.hasMany(Schedule, { foreignKey: "doctorId" });
Schedule.belongsTo(Doctor, { foreignKey: "doctorId" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });
User.hasOne(Appointment, { foreignKey: "patientId" });
Appointment.belongsTo(User, { foreignKey: "patientId" });
User.hasMany(FeedPost, { foreignKey: 'userId' });
FeedPost.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
FeedPost.hasMany(Comment, { foreignKey: 'feedId' });
Comment.belongsTo(FeedPost, { foreignKey: 'feedId' });
User.hasMany(Vote, { foreignKey: 'userId' });
Vote.belongsTo(User, { foreignKey: 'userId' });
FeedPost.hasMany(Vote, { foreignKey: "feedId" });
Vote.belongsTo(FeedPost, { foreignKey: 'feedId' });
Comment.hasMany(CommentVote, { foreignKey: "commentId" });
CommentVote.belongsTo(Comment, { foreignKey: "commentId" });
User.hasMany(CommentVote, { foreignKey: "userId" });
CommentVote.belongsTo(User, { foreignKey: "userId" });
FeedPost.hasMany(CommentVote, { foreignKey: "feedId" });
CommentVote.belongsTo(FeedPost, { foreignKey: "feedId" });
try {
    await sequelize.authenticate();
    console.log("database connected successfully !");
    // await sequelize.sync({force:false,alter:false})
    // console.log('synced !')
}
catch (error) {
    console.log("Data base connection error");
    console.log("Database error", error);
}
//# sourceMappingURL=index.js.map