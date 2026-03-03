import type { Response } from "express";


const APIResponse = (res:Response,statusCode:number,message:string,data:any=[])=>{
    res.status(statusCode).json({
        message,
        data: data.length > 0 ? data : null
    })
}

export default APIResponse