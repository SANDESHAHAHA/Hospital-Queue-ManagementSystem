import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
await import ('./database/index.js')

import adminSeeder  from './services/adminSeeder.js'
adminSeeder()

import userRoute from './routes/UserRoute.js'
import doctorRoute from './routes/DoctorRoute.js'

app.use("",userRoute)
app.use("",doctorRoute)

app.listen(process.env.PORT,()=>{
    console.log("Project has been started at port no ",process.env.PORT)
})