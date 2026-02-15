import bcrypt from 'bcrypt';
import User from "../database/models/User.js";
const adminSeeder = async () => {
    const data = await User.findOne({
        where: {
            email: process.env.ADMIN_EMAIL
        }
    });
    if (!data) {
        await User.create({
            email: process.env.ADMIN_EMAIL,
            userName: process.env.ADMIN_USERNAME,
            password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
            phoneNumber: process.env.ADMIN_PHONENUMBER,
            role: "admin"
        });
        console.log("Admin seeded successfully !");
    }
    else {
        console.log("Admin already seeded !");
    }
};
export default adminSeeder;
//# sourceMappingURL=adminSeeder.js.map