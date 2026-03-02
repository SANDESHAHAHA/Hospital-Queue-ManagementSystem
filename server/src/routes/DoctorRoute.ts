import express,{Router, type RequestHandler} from 'express'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import { Role } from '../globals/types/Role.js'
import errorHandler from '../globals/errorHandler/ErrorHandler.js'
import DoctorController from '../controllers/DoctorController.js'
import QueueController from '../controllers/QueueController.js'


const router:Router = express.Router()

router.route("/applyDoctor").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Patient) as unknown as RequestHandler,errorHandler(DoctorController.applyForDoctor))
router.route("/setConsultationTime").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Doctor) as unknown as RequestHandler,errorHandler(DoctorController.setConsultationTime))
router.route("/setDoctorAvailability").post(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Doctor) as unknown as RequestHandler,errorHandler(DoctorController.setDoctorAvailability))
router.route("/getDoctorQueue/:doctorId").patch(AuthMiddleware.isLoggedIn as unknown as RequestHandler,AuthMiddleware.restrictTo(Role.Doctor) as unknown as RequestHandler,errorHandler(QueueController.getDoctorQueue))

export default router