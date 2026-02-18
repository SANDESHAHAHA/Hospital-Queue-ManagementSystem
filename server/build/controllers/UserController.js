import User from "../database/models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Doctor from "../database/models/Doctor.js";
import Schedule from "../database/models/Schedule.js";
class UserController {
    static async registerUser(req, res) {
        const { userName, email, password, phoneNumber } = req.body ?? {};
        if (!userName || !email || !password || !phoneNumber) {
            res.status(400).json({
                message: "Please provide username, email and password !"
            });
            return;
        }
        await User.create({
            userName,
            email,
            password: bcrypt.hashSync(password, 10),
            phoneNumber,
        });
        res.status(200).json({
            message: "User registerd successfully !"
        });
        return;
    }
    static async loginUser(req, res) {
        const { email, password } = req.body ?? {};
        if (!email || !password) {
            res.status(400).json({
                message: "Please provide email and password !"
            });
            return;
        }
        const [data] = await User.findAll({
            where: {
                email
            }
        });
        if (!data) {
            res.status(404).json({
                message: "No user with that email found !"
            });
            return;
        }
        const isMatched = bcrypt.compareSync(password, data.password);
        if (!isMatched) {
            res.status(400).json({
                message: "Please provide valid email or password !"
            });
            return;
        }
        const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.status(200).json({
            message: "User logged in successfully !",
            data: token
        });
    }
    static async getAllUsers(req, res) {
        const data = await User.findAll();
        if (data.length < 0) {
            res.status(404).json({
                message: "No users found",
            });
            return;
        }
        res.status(200).json({
            message: "All users data fetched successfully !",
            data
        });
        return;
    }
    static async getAllDoctors(req, res) {
        const data = await Doctor.findAll({
            where: {
                isApproved: true
            }
        });
        if (data.length <= 0) {
            res.status(404).json({
                message: "No doctors found !",
                data: []
            });
            return;
        }
        // if doctors found return doctors 
        res.status(200).json({
            message: "All Doctors fetched suucessfully !",
            data
        });
    }
    static async getAllSlots(req, res) {
        const data = await Schedule.findAll();
        if (data.length <= 0) {
            res.status(404).json({
                message: "No schedules found booked by the user !"
            });
            return;
        }
        res.status(200).json({
            message: "Schedules fetched successfully !",
            data
        });
    }
}
export default UserController;
//# sourceMappingURL=UserController.js.map