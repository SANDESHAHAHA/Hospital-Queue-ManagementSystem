import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()


const app = express()
app.use(express.json())
await import ('./database/index.js')

import './services/CronJobScheduler.js'

import adminSeeder  from './services/adminSeeder.js'
adminSeeder()

import userRoute from './routes/UserRoute.js'
import doctorRoute from './routes/DoctorRoute.js'
import adminRoute from './routes/AdminRoute.js'
import appointMentRoute from './routes/AppointmentRoute.js'

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization","Accept"],
    credentials: true
}))

app.use("",appointMentRoute)
app.use("",userRoute)
app.use("",doctorRoute)
app.use("",adminRoute)

export default app