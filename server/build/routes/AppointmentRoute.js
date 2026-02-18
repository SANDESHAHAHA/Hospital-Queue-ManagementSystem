import express, { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import errorHandler from '../globals/errorHandler/ErrorHandler.js';
import AppointmentController from '../controllers/AppointmentController.js';
import { Role } from '../globals/types/Role.js';
const router = express.Router();
router.route("/bookAppointment").post(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Patient), errorHandler(AppointmentController.bookAppointMent));
export default router;
//# sourceMappingURL=AppointmentRoute.js.map