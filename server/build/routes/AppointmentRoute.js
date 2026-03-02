import express, { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import errorHandler from '../globals/errorHandler/ErrorHandler.js';
import AppointmentController from '../controllers/AppointmentController.js';
import { Role } from '../globals/types/Role.js';
const router = express.Router();
router.route("/bookAppointment").post(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Patient), errorHandler(AppointmentController.bookAppointMent));
router.route("/getAppointmentDetails").get(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Doctor, Role.Patient), errorHandler(AppointmentController.getMyAppointmentDetails));
router.route("/cancelMyAppointment/:appointmentId").patch(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Patient), errorHandler(AppointmentController.cancelMyAppointment));
router.route("/getAllAppoinments").get(AuthMiddleware.isLoggedIn, errorHandler(AppointmentController.getAllAppointments));
router.route("/updateAppointmentStatus/:id").patch(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Doctor, Role.Patient), errorHandler(AppointmentController.updateAppointmentStatus));
export default router;
//# sourceMappingURL=AppointmentRoute.js.map