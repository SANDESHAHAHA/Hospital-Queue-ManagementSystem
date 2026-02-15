import express, { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import { Role } from '../globals/types/Role.js';
import errorHandler from '../globals/errorHandler/ErrorHandler.js';
import DoctorController from '../controllers/DoctorController.js';
const router = express.Router();
router.route("/applyDoctor").post(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Patient), errorHandler(DoctorController.applyForDoctor));
router.route("/setConsultationTime").post(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Doctor), errorHandler(DoctorController.setConsultationTime));
export default router;
//# sourceMappingURL=DoctorRoute.js.map