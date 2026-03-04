import express,{ Router, type RequestHandler } from "express";
import UserController from "../controllers/UserController.js";
import errorHandler from "../globals/errorHandler/ErrorHandler.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { Role } from "../globals/types/Role.js";
import QuestionController from "../controllers/QuestionController.js";
import CommentController from "../controllers/CommentController.js";
import {multer,storage} from "../middleware/multerConfig.js";

const upload = multer({storage:storage})

const router:Router = express.Router()


router.route("/register").post(upload.single('image'),errorHandler(UserController.registerUser))
router.route("/login").post(errorHandler(UserController.loginUser))
router.route("/doctors").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin,Role.Doctor,Role.Patient) as unknown as RequestHandler,errorHandler(UserController.getAllDoctors))
router.route("/slots").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,errorHandler(UserController.getAllSlots))
router.route("/users").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin) as unknown as RequestHandler,errorHandler(UserController.getAllUsers))
router.route("/verifyOTP").post(errorHandler(UserController.verifyOTP))
router.route("/reset-password").post(errorHandler(UserController.resetPassword))
router.route("/createQuestion").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin,Role.Patient) as unknown as RequestHandler,upload.single('image'),errorHandler(QuestionController.createQuestion))
router.route("/getAllQuestions").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Doctor,Role.Admin,Role.Patient) as unknown as RequestHandler,errorHandler(QuestionController.getAllQuestions))
router.route("/voteQuestion/:id").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin,Role.Patient,Role.Doctor) as unknown as RequestHandler,errorHandler(QuestionController.questionVote))
router.route("/removeQuestionVote/:id").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin,Role.Doctor,Role.Patient) as unknown as RequestHandler,errorHandler(QuestionController.removeQuestionVote))

router.route("/createComment/:questionId").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin,Role.Patient,Role.Doctor) as unknown as RequestHandler,errorHandler(CommentController.createComment))
router.route("/getComments/:questionId").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin,Role.Doctor,Role.Patient) as unknown as RequestHandler,errorHandler(CommentController.getCommentByQuestion))
router.route("/updateComment/:commentId").patch(AuthMiddleware.isLoggedIn as unknown as RequestHandler,errorHandler(CommentController.updateComment))
router.route("/deleteComment/:commentId").delete(AuthMiddleware.isLoggedIn as unknown as RequestHandler,errorHandler(CommentController.deleteComment))
router.route("/commentVote/:commentId").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,errorHandler(CommentController.commentVote))
router.route("/removeCommentVote/:commentId").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,errorHandler(CommentController.removeCommentVote))

export default router 