import nodemailer from 'nodemailer'

interface IData{
    to:string,
    subject:string,
    text:string
}

const sendMail = async(data:IData)=>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
             user:process.env.NODEMAILER_EMAIL as string,
             pass:process.env.NODEMAILER_PASSKEY as string
        }
    })
    const mailOptions = {
        from:process.env.NODEMAILER_EMAIL,
        to:data.to,
        subject:data.subject,
        text:data.text
    }
    await transporter.sendMail(mailOptions)
}

export default sendMail