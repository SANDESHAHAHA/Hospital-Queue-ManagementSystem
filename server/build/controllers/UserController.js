import User from "../database/models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Doctor from "../database/models/Doctor.js";
import Schedule from "../database/models/Schedule.js";
import generateTimeSlots from "../services/generateTimeSlots.js";
import Appointment from "../database/models/Appointment.js";
import { Op } from "sequelize";
import { AppointmentStatus } from "../globals/types/AppointmentTypes/Appointment.js";
import sendMail from "../services/sendMail.js";
import generateOtp from "../services/GenerateOtp.js";
import otpHtml from "../utils/htmlBodies/otpHtml.js";
import RegisterUserHtml from "../utils/htmlBodies/RegisterUserhtml.js";
import checkOTPexpirationTime from "../services/checkOTPexiparationTime.js";
import { Role } from "../globals/types/Role.js";
import APIResponse from "../utils/APIResponses/ApiResponse.js";
import fs from 'fs';
import path from 'path';
import uploadOnCloudinary from "../services/cloudinaryConfig.js";
class UserController {
    static async registerUser(req, res) {
        const { userName, email, password, phoneNumber } = req.body ?? {};
        if (!userName || !email || !password || !phoneNumber) {
            res.status(400).json({
                message: "Please provide username, email and password !"
            });
            return;
        }
        if (!req.file) {
            APIResponse(res, 400, "Profile Avatar is required !");
            return;
        }
        const filePath = path.join('./uploads', req.file.filename);
        const cloudiaryResponse = await uploadOnCloudinary(filePath);
        let fileName;
        if (cloudiaryResponse && cloudiaryResponse.secure_url) {
            fileName = cloudiaryResponse.secure_url;
        }
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await User.create({
            userName,
            email,
            password: bcrypt.hashSync(password, 10),
            phoneNumber,
            imageUrl: fileName
        });
        try {
            await sendMail({
                to: email,
                subject: "User registered successfully !",
                html: RegisterUserHtml(userName)
            });
        }
        catch (error) {
            // log error, but don't fail registration
            console.error('sendMail error:', error);
        }
        APIResponse(res, 201, "User Registerd Successfully !", fileName);
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
        // if user is admin, bypass OTP and issue token immediately
        if (data.role === Role.Admin) {
            const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            // optional: clear any existing OTP fields for admin
            try {
                await data.update({ OTP: null, OTPgeneratedTime: null });
            }
            catch { }
            res.status(200).json({
                message: "Admin logged in successfully !",
                token,
                expiresIn: "1d"
            });
            return;
        }
        const otp = generateOtp();
        await sendMail({
            to: email,
            subject: "Login password otp Request !",
            html: otpHtml(otp)
        });
        // store the otp to the database 
        const OTPcreatedTime = Date.now().toString();
        await data.update({ OTP: otp, OTPgeneratedTime: OTPcreatedTime });
        // ask non-admin user to submit otp to complete login
        res.status(200).json({
            message: "User can now enter otp for further to login !",
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
    static async verifyOTP(req, res) {
        const { email, otp } = req.body ?? {};
        const userEmail = email ?? req.user?.email;
        if (!userEmail) {
            res.status(400).json({
                message: "Email is required to further process for login !"
            });
            return;
        }
        if (!otp) {
            res.status(400).json({
                message: "Please provide otp to process for login !"
            });
            return;
        }
        // check if the user exists 
        const data = await User.findOne({
            where: {
                email: userEmail
            }
        });
        if (!data) {
            res.status(404).json({
                message: "No user with given email found !"
            });
            return;
        }
        //check if the user otp valids the given otp 
        const checkedOTP = await User.findOne({
            where: {
                email: userEmail,
                OTP: otp
            }
        });
        if (!checkedOTP) {
            res.status(404).json({
                message: "Invalid otp sent !"
            });
            return;
        }
        // if otp matched check otp expiration time
        const otpgeneratedTime = checkedOTP.OTPgeneratedTime;
        const isOtpValid = checkOTPexpirationTime(otpgeneratedTime, 120000); // 120000 ms = 2 minutes
        if (!isOtpValid) {
            res.status(403).json({
                message: "You are forbidden to proceed as OTP has expired !"
            });
            return;
        }
        const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.status(200).json({
            message: "User logged in successfully !",
            token,
            expiresIn: "1d"
        });
    }
    static async resetPassword(req, res) {
        const { email, newPassword, confirmPassword } = req.body ?? {};
        if (!email || !newPassword || !confirmPassword) {
            res.status(400).json({
                message: "Please provide email,newPassword,confirmPassword,email"
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            res.status(400).json({
                message: "new password and confirm password should be same ! "
            });
            return;
        }
        // if the passwords are matched then ? 
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            res.status(404).json({
                message: "No user with email exists"
            });
            return;
        }
        //if there is user
        user.password = bcrypt.hashSync(newPassword, 8);
        await user.save();
        res.status(200).json({
            message: "user password updated successfully"
        });
        return;
    }
    static async getAllDoctors(req, res) {
        const data = await Doctor.findAll({
            where: {
                isApproved: true
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'userName', 'email', 'role', 'phoneNumber']
                }
            ]
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
        const data = await Schedule.findAll({
            include: [
                {
                    model: Doctor,
                    attributes: ["id", "avgConsultationTime"]
                }
            ]
        });
        if (!data.length) {
            res.status(404).json({
                message: "No schedules found !",
                data: []
            });
            return;
        }
        const toMinutes = (t) => {
            const [h = 0, m = 0] = t.slice(0, 5).split(":").map(Number);
            return h * 60 + m;
        };
        const result = [];
        for (const s of data) {
            const item = s.toJSON();
            const avg = (item.Doctor && item.Doctor.avgConsultationTime) || 0;
            const generated = avg > 0 ? generateTimeSlots(item.startTime, item.endTime, avg, item.breakStart, item.breakEnd) : [];
            // fetch appointments for this doctor and date that are not cancelled
            const booked = await Appointment.findAll({
                where: {
                    doctorId: item.doctorId,
                    date: item.date,
                    status: { [Op.ne]: AppointmentStatus.CANCELLED }
                },
                attributes: ["startTime", "endTime"]
            });
            const bookedIntervals = booked.map(b => ({
                s: toMinutes(b.startTime),
                e: toMinutes(b.endTime)
            }));
            const available = generated.filter(slot => {
                const [sStr = "00:00", eStr = "00:00"] = slot.split("-");
                const sMin = toMinutes(sStr);
                const eMin = toMinutes(eStr);
                return !bookedIntervals.some(bi => sMin < bi.e && eMin > bi.s);
            });
            item.slots = available;
            result.push(item);
        }
        res.status(200).json({
            message: "Schedules fetched successfully !",
            data: result
        });
    }
}
export default UserController;
//# sourceMappingURL=UserController.js.map