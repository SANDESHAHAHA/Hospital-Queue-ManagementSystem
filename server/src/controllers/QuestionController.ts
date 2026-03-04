import type { Request,Response } from "express";
import APIResponse from "../utils/APIResponses/ApiResponse.js";
import fs from 'fs'
import path from 'path'
import uploadOnCloudinary from "../services/cloudinaryConfig.js";
import FeedPost from "../database/models/Feed_posts.js";
interface IQuestionRequest extends Request{
    file:Express.Multer.File,
    user:{
        id:string,
        email:string,
        role:string
    }
}
class QuestionController{
    public static async createQuestion(req:IQuestionRequest,res:Response):Promise<void>{
        const {title,description,category,tags} = req.body ?? {}
        if(!title || !description || !category || !tags){
            APIResponse(res,404,"Title,description,tags and category are required !")
            return
        }

        let fileName

        if(req.file){
        const filePath = path.join('./uploads',req.file.filename)
        const cloudiaryResponse = await uploadOnCloudinary(filePath)
        if(cloudiaryResponse && cloudiaryResponse.secure_url){
         fileName = cloudiaryResponse.secure_url
        }

        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }
        }

        const data = await FeedPost.create({
            title,
            description,
            category,
            tags,
            imageUrl:fileName ? fileName : null,
            userId:req.user.id
        })
        // convert Sequelize instance to plain object for logging/emit/response
        const payload = data && typeof data.toJSON === 'function' ? data.toJSON() : data
        console.log("data", payload)
        // emit the new question to all connected websocket clients (if io is available)
        try{
            const io = (req.app as any).get('io')
            if(io){
                io.emit('new-question', payload)
            }
        }catch(e){
            console.error('Error emitting new-question', e)
        }
        
        APIResponse(res,200,"Question created successfully !",payload)
   
    }

}

export default QuestionController