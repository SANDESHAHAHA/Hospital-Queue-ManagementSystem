import type { Response } from "express";


const APIResponse = (res:Response, statusCode:number, message:string, data:any = null) => {
    const hasData = data !== undefined && data !== null
    res.status(statusCode).json({
        message,
        data: hasData ? data : null
    })
}

export default APIResponse