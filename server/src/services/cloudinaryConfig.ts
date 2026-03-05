import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Configure Cloudinary
const configureCloudinary = () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_SECRET_KEY

    if (!cloudName || !apiKey || !apiSecret) {
        console.error('Missing Cloudinary configuration:')
        if (!cloudName) console.error('  - CLOUDINARY_CLOUD_NAME is not provided')
        if (!apiKey) console.error('  - CLOUDINARY_API_KEY is not provided')
        if (!apiSecret) console.error('  - CLOUDINARY_SECRET_KEY is not provided')
        throw new Error('Cloudinary API credentials are not properly configured')
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    })
    
    console.log('✓ Cloudinary configured successfully')
}

// Call configuration
configureCloudinary()

const uploadOnCloudinary = async(localFilePath:string)=>{
    try {
        if(!localFilePath){
            return null
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto',
            folder: 'hospital-queue-management'
        })
        console.log('✓ File uploaded successfully to Cloudinary')
        return response
    } catch (error) {
        console.log('Error uploading to cloudinary:', error)
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
        return null
    }
}

export default uploadOnCloudinary