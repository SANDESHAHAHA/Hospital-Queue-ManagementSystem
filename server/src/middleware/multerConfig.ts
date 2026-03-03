import multer from 'multer'
import type { Request } from 'express'

const storage = multer.diskStorage({
    destination : function(req:Request,file:Express.Multer.File,cb:any){
        const allowedTypes = ['image/jpeg','image/png','image/jpg','image/webp']
        if(!allowedTypes.includes(file.mimetype)){
            cb(new Error("This file type is not allwoed !"))
            return
        }
        cb(null,'./uploads')
    },
    filename: function(req:Request,file:Express.Multer.File,cb:any){
        cb(null,Date.now()+'-'+file.originalname)
    }  
    
})
const MAX_FILE_SIZE = 2 * 1024 * 1024

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE }
})
export {
    multer,
    storage,
    upload
}