import express,{ Router, type RequestHandler } from "express";
import UserController from "../controllers/UserController.js";
import errorHandler from "../globals/errorHandler/ErrorHandler.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { Role } from "../globals/types/Role.js";


const router:Router = express.Router()


router.route("/register").post(errorHandler(UserController.registerUser))
router.route("/login").post(errorHandler(UserController.loginUser))
router.route("/doctors").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin,Role.Doctor,Role.Patient) as unknown as RequestHandler,errorHandler(UserController.getAllDoctors))
router.route("/slots").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,errorHandler(UserController.getAllSlots))
router.route("/users").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin) as unknown as RequestHandler,errorHandler(UserController.getAllUsers))
router.route("/verifyOTP").post(errorHandler(UserController.verifyOTP))

export default router