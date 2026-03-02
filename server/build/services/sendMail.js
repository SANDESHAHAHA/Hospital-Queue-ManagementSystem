import nodemailer from 'nodemailer';
const sendMail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSKEY
        }
    });
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.html
    };
    await transporter.sendMail(mailOptions);
};
export default sendMail;
//# sourceMappingURL=sendMail.js.map