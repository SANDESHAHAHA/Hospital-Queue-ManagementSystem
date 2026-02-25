import express,{ Router, type RequestHandler } from "express";
import UserController from "../controllers/UserController.js";
import errorHandler from "../globals/errorHandler/ErrorHandler.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router:Router = express.Router()


router.route("/register").post(errorHandler(UserController.registerUser))
router.route("/login").post(errorHandler(UserController.loginUser))
router.route("/doctors").get(errorHandler(UserController.getAllDoctors))
router.route("/slots").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,errorHandler(UserController.getAllSlots))



export default router