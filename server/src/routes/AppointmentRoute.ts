import express,{Router, type RequestHandler} from 'express'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import errorHandler from '../globals/errorHandler/ErrorHandler.js'
import AppointmentController from '../controllers/AppointmentController.js'
import { Role } from '../globals/types/Role.js'

const router:Router = express.Router()

router.route("/bookAppointment").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Patient) as unknown as RequestHandler,errorHandler(AppointmentController.bookAppointMent))


export default router