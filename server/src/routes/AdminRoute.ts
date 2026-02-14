import express,{Router, type RequestHandler} from 'express'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import { Role } from '../globals/types/Role.js'
import errorHandler from '../globals/errorHandler/ErrorHandler.js'
import AdminController from '../controllers/AdminController.js'

const router:Router = express.Router()

router.route("/getAppliedDoctors").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin) as unknown as RequestHandler,errorHandler(AdminController.getAppliedDoctors))
router.route("/getApprovedDoctors").get(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Admin) as unknown as RequestHandler,errorHandler(AdminController.viewApprovedDoctors))

export default router