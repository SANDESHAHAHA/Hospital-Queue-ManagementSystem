import express, { Router } from "express";
import UserController from "../controllers/UserController.js";
import errorHandler from "../globals/errorHandler/ErrorHandler.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { Role } from "../globals/types/Role.js";
import QuestionController from "../controllers/QuestionController.js";
import { multer, storage } from "../middleware/multerConfig.js";
const upload = multer({ storage: storage });
const router = express.Router();
router.route("/register").post(upload.single('image'), errorHandler(UserController.registerUser));
router.route("/login").post(errorHandler(UserController.loginUser));
router.route("/doctors").get(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Admin, Role.Doctor, Role.Patient), errorHandler(UserController.getAllDoctors));
router.route("/slots").get(AuthMiddleware.isLoggedIn, errorHandler(UserController.getAllSlots));
router.route("/users").get(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Admin), errorHandler(UserController.getAllUsers));
router.route("/verifyOTP").post(errorHandler(UserController.verifyOTP));
router.route("/reset-password").post(errorHandler(UserController.resetPassword));
router.route("/createQuestion").post(AuthMiddleware.isLoggedIn, AuthMiddleware.restrictTo(Role.Admin, Role.Patient), errorHandler(QuestionController.createQuestion));
export default router;
//# sourceMappingURL=UserRoute.js.map