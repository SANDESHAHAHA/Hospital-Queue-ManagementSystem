import express, { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import { Role } from '../globals/types/Role.js';
import errorHandler from '../globals/errorHandler/ErrorHandler.js';
import AdminController from '../controllers/AdminController.js';
const router = express.Router();
router.route("/getAppliedDoctors").get(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Admin), errorHandler(AdminController.getAppliedDoctors));
router.route("/getApprovedDoctors").get(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Admin), errorHandler(AdminController.viewApprovedDoctors));
router.route("/approveDoctor/:doctorId").patch(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Admin), errorHandler(AdminController.approveDoctor));
export default router;
//# sourceMappingURL=AdminRoute.js.map