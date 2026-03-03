import type { Request,Response } from "express";
import APIResponse from "../utils/APIResponses/ApiResponse.js";


class QuestionController{
    public static async createQuestion(req:Request,res:Response):Promise<void>{
        const {title,description,category,tags} = req.body ?? {}
        if(!title || !description || !category || !tags){
            APIResponse(res,404,"Title,description and category are required !")
        }
        return
    }
    

}

export default QuestionController