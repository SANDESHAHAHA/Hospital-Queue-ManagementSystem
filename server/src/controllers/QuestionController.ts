import type { Request,Response } from "express";
import APIResponse from "../utils/APIResponses/ApiResponse.js";
import { validate as isUUID, version as uuidVersion } from 'uuid'
import fs from 'fs'
import path from 'path'
import uploadOnCloudinary from "../services/cloudinaryConfig.js";
import FeedPost from "../database/models/Feed_posts.js";
import { VoteType } from "../globals/types/VoteTypes/voteTypes.js";
import User from "../database/models/User.js";
import FeedVote from "../database/models/FeedVote.js";
import CommentVote from "../database/models/CommentVote.js";
import Comment from "../database/models/CommentModel.js";
interface IQuestionRequest extends Request{
    file:Express.Multer.File,
    user:{
        id:string,
        email:string,
        role:string
    }
}
class ExtendedFeedVote extends FeedVote{
    declare feedId:string
    declare userId:string
}

class ExtendedFeedPost extends FeedPost{
    declare userId : string
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

        const payload = data && typeof data.toJSON === 'function' ? data.toJSON() : data
        
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

    public static async getAllQuestions(req:IQuestionRequest,res:Response):Promise<void>{
    
        const data = await FeedPost.findAll()
        if(!data.length){
            APIResponse(res,404,"No feeds available !")
            return
        }
        APIResponse(res,200,"Questions fetched successfully !",data)
        return
    }

    public static async questionVote(req:IQuestionRequest,res:Response):Promise<void>{
        const {id} = req.params
        const {type} = req.body ?? {}
        const userId = req.user.id
        if(!id){
            APIResponse(res,400,"Please send id of the post !")
            return
        }
        if(!type){
            APIResponse(res,400,"Please send type !")
            return
        }
        if(!userId){
            APIResponse(res,403,"Unauthorized access !")
            return
        }
        if(!Object.values(VoteType).includes(type)){
            APIResponse(res,400,"Please send valid like type !")
            return
        }
        if(!isUUID(id) || uuidVersion(id as string) !== 4){
            APIResponse(res,400,"Invalid id format. UUID v4 expected.")
            return
        }
        const question = await FeedPost.findByPk(id as string)
        if(!question){
            APIResponse(res,404,"No feed post of that id found !")
            return
        }

        const alreadyVoted = await FeedVote.findOne({
            where:{
                feedId:id,
                userId
            }
        })
        if(alreadyVoted){
            APIResponse(res,409,"User has already performed action!",alreadyVoted)
            return
        }

        const user = await User.findByPk(userId)
        if(!user){
            APIResponse(res,404,"No user of that id found !")
            return
        }
        const data = await FeedVote.create({
            type,
            userId,
            feedId:id
        })
        const extendedfeedvote:ExtendedFeedVote = data as ExtendedFeedVote

        const payload = {
            id:data.id,
            type:data.type,
            userId:extendedfeedvote.userId,
            feedId:extendedfeedvote.feedId
        }
        // console.log("votedata",payload)
        const io = req.app.get('io')

        if(io){ 
            io.emit("feed-likes",payload)
        }
        APIResponse(res,200,"Voted successfully !",payload)
        return
    }
    public static async removeQuestionVote(req:IQuestionRequest,res:Response):Promise<void>{
        const {id} = req.params
        const userId = req.user.id
        if(!userId){
            APIResponse(res,403,"Unauthorized access !")
            return
        }
        const question = await FeedPost.findByPk(id as string)
        if(!question){
            APIResponse(res,404,"Question not found !")
            return
        }
        const vote = await FeedVote.destroy({
            where:{
                feedId:id,
                userId
            }
        })
        if(!vote){
            APIResponse(res,404,"No votes found !")
            return
        }
        const data = await FeedVote.findAll({
            where:{
                feedId:id,
            }
        })
        
        const io = req.app.get("io")
        io.emit("feed-likes",data)

        APIResponse(res,200,"Vote deleted successfully !")
        return
    }
    public static async updateQuestion(req:IQuestionRequest,res:Response):Promise<void>{
        const {id} = req.params //question id
        const {title,category,tags,description} = req.body ?? {}
        const userId = req.user.id

        const question = await FeedPost.findByPk(id as string)

        if(!question){
            APIResponse(res,404,"Question not found !")
            return
        }
        const extendedFeedPost:ExtendedFeedPost = question as ExtendedFeedPost
        if(extendedFeedPost.userId !== userId){
            APIResponse(res,403,"You can only edit your question !")
            return
        }

        question.title = title || question.title,
        question.description = description || question.description,
        question.category = category || question.category
        question.tag = tags || question.tag
        question.updatedAt = Date.now()
        await question.save()

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
        await question.update({imageUrl:fileName})
        }
        const updatedQuestion = await FeedPost.findOne({
            where:{
                userId,
                id
            }
        })

        const io = req.app.get('io')
        if(io){
            io.emit("question-updated",updatedQuestion)
        }
        
        APIResponse(res,200,"Question updated successfully !",updatedQuestion)
        return
    }
    public static async deleteQuestion(req:IQuestionRequest,res:Response):Promise<void>{
        const {id} = req.params
        const userId  = req.user.id 

        const question = await FeedPost.findByPk(id as string)
        if(!question){
            APIResponse(res,404,"NO question with that id found !")
            return
        }
        const extendedFeedPost:ExtendedFeedPost = question as ExtendedFeedPost
        if(extendedFeedPost.userId !== userId){
            APIResponse(res,403,"You can only delete your question !")
            return
        }
        await FeedVote.destroy({
            where:{
                feedId:id
            }
        })
        await CommentVote.destroy({
            where:{
                feedId:id
            }
        })
        await Comment.destroy({
            where:{
                feedId:id
            }
        })
        APIResponse(res,200,"Question deleted successfully !")
        return
    }

}
    
export default QuestionController