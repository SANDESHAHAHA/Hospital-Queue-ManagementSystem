import type { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User from "../database/models/User.js";
import type { Role } from "../globals/types/Role.js";

interface AuthRequest extends Request{
    user:{
        id:string,
        role:string,
        userName:string,
        email:string,
        phoneNumber:string
    }
}

class AuthMiddleware{
    public static async isLoggedIn(req:AuthRequest,res:Response,next:NextFunction):Promise<void>{
        const token = req.headers.authorization
        if(!token){
            res.status(401).json({
                message:"Please log in to perform actions !"
            })
            return
        }
        jwt.verify(token,process.env.JWT_SECRET as string,async(err,result:any)=>{
            if(err){
                res.status(401).json({
                    message:"Invalid token for your credentials !"
                })
                return
            }
            const userData = await User.findByPk(result.userId)
            if(!userData){
                res.status(404).json({
                    message:"No user found with that id !"
                })
                return
            }
            req.user = userData
            next()
        })
    }
    public static restrictTo(...roles:Role[]){
        return(req:AuthRequest,res:Response,next:NextFunction)=>{
            let userRole = req.user.role as Role 
            if(!roles.includes(userRole)){
                res.status(403).json({
                    message:"You don't have permission !"
                })
                return
            }
            next()
        }
    }

}

export default AuthMiddleware