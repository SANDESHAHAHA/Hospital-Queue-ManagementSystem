import { Sequelize } from "sequelize-typescript";
import User from "./models/User.js";
const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    models: [User]
});
try {
    await sequelize.authenticate();
    console.log("database connected successfully !");
    await sequelize.sync({ force: false });
    console.log('synced !');
}
catch (error) {
    console.log("Data base connection error");
    console.log("Database error", error);
}
//# sourceMappingURL=index.js.map