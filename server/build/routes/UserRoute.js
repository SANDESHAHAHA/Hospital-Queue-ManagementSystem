import express, { Router } from "express";
import UserController from "../controllers/UserController.js";
const router = express.Router();
router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.loginUser);
export default router;
//# sourceMappingURL=UserRoute.js.map