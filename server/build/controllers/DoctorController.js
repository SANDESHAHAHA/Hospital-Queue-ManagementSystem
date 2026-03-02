import Doctor from "../database/models/Doctor.js";
import User from "../database/models/User.js";
import { Op } from "sequelize";
import Schedule from "../database/models/Schedule.js";
import generateTimeSlots from "../services/generateTimeSlots.js";
class DoctorController {
    static async applyForDoctor(req, res) {
        const { specialization, licenseNumber } = req.body ?? {};
        if (!specialization || !licenseNumber) {
            res.status(400).json({
                message: "Please provide specialization,licenseNumber,avgConsultationTime ! "
            });
            return;
        }
        //check if already applied
        const existingDoctor = await Doctor.findOne({
            where: {
                userId: req.user.id
            }
        });
        if (existingDoctor) {
            res.status(400).json({
                message: "You have already applied as a doctor !"
            });
            return;
        }
        const doctor = await Doctor.create({
            userId: req.user.id,
            specialization,
            licenseNumber
        });
        res.status(201).json({
            message: "Request has been applied for the roll of Doctor !",
            data: doctor
        });
        return;
    }
    static async setConsultationTime(req, res) {
        const { avgConsultationTime } = req.body ?? {};
        const userId = req.user.id;
        if (avgConsultationTime === undefined || avgConsultationTime <= 0 || typeof avgConsultationTime !== "number") {
            res.status(400).json({
                message: "Please provide valid consultation time !"
            });
            return;
        }
        const doctor = await Doctor.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'userName', 'email', 'role', 'phoneNumber']
                }
            ]
        });
        if (!doctor) {
            res.status(404).json({
                message: "No doctor with that user id exists !"
            });
            return;
        }
        //check if doctor has been approved already !
        if (!doctor.isApproved) {
            res.status(403).json({
                message: "Doctor not approved yet !"
            });
            return;
        }
        await doctor.update({ avgConsultationTime });
        // generate slots for existing/future schedules using the new consultation time
        const today = new Date().toISOString().split("T")[0];
        const schedules = await Schedule.findAll({
            where: {
                doctorId: doctor.id,
                date: { [Op.gte]: today }
            }
        });
        const slots = schedules.map(s => ({
            date: s.date,
            slots: generateTimeSlots(s.startTime, s.endTime, avgConsultationTime, s.breakStart, s.breakEnd)
        }));
        res.status(200).json({
            message: "Doctor consultation time set successfully !",
            data: doctor,
            generatedSlots: slots
        });
    }
    static async setDoctorAvailability(req, res) {
        const { date, startTime, endTime, breakStart, breakEnd } = req.body ?? {};
        const userId = req.user.id;
        if (!date || !startTime || !endTime) {
            res.status(400).json({
                message: "Please send date, startTime and endTime"
            });
            return;
        }
        if (startTime >= endTime) {
            res.status(400).json({
                message: "startTime must be earlier than endTime !"
            });
            return;
        }
        // validate break times if provided
        if (breakStart && breakEnd) {
            if (!(breakStart < breakEnd)) {
                res.status(400).json({ message: "breakStart must be earlier than breakEnd" });
                return;
            }
            if (breakStart <= startTime || breakEnd >= endTime) {
                res.status(400).json({ message: "Break must be within availability start and end times" });
                return;
            }
        }
        //prevent past dates 
        const today = new Date().toISOString().split("T")[0];
        if (today) {
            if (date < today) {
                res.status(400).json({
                    message: "Cannot set the availability in the past !"
                });
                return;
            }
        }
        // if availability is for today , check time 
        if (date === today) {
            const currentTime = new Date().toTimeString().slice(0, 5); // HH:MM:SS
            if (endTime <= currentTime) {
                res.status(400).json({
                    message: "Cannot set availability for past time today !"
                });
            }
        }
        // find doctor 
        const doctor = await Doctor.findOne({
            where: {
                userId
            }
        });
        if (!doctor) {
            res.status(400).json({
                message: "Doctor profile not found !"
            });
            return;
        }
        if (!doctor.isApproved) {
            res.status(403).json({
                message: "Doctor not approved yet !"
            });
            return;
        }
        //check overlap availability 
        const overlapping = await Schedule.findOne({
            where: {
                doctorId: doctor.id,
                date,
                startTime: { [Op.lt]: endTime },
                endTime: { [Op.gt]: startTime }
            }
        });
        if (overlapping) {
            res.status(400).json({
                message: "Availability overlaps with existing schedule !"
            });
            return;
        }
        // finally create schedule 
        const schedule = await Schedule.create({
            doctorId: doctor.id,
            date,
            startTime,
            endTime,
            breakStart: breakStart || null,
            breakEnd: breakEnd || null
        });
        res.status(201).json({
            message: "Doctor availability created successfully !",
            data: schedule
        });
    }
}
export default DoctorController;
//# sourceMappingURL=DoctorController.js.map