
const RegisterUserHtml = (userName:string)=>{
    return  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You for Registering</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f4f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f4c81 0%, #1a73e8 100%); padding: 50px 40px 40px; text-align:center;">
              <div style="display:inline-block; background:rgba(255,255,255,0.15); border-radius:50%; width:70px; height:70px; line-height:70px; font-size:36px; margin-bottom:16px;">🎉</div>
              <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:700; letter-spacing:-0.5px;">Thank You for Registering!</h1>
              <p style="margin:12px 0 0; color:#c8e0ff; font-size:14px;">We're glad to have you with us</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 40px 40px 0; text-align:center;">
              <p style="margin:0; font-size:16px; color:#333; line-height:1.6;">
                Dear <strong>${userName}</strong>,
              </p>
              <p style="margin:16px 0 0; font-size:15px; color:#555; line-height:1.8;">
                Thank you for registering with <strong style="color:#0f4c81;">City General Hospital</strong>'s Queue Management System.
                We're committed to making your healthcare experience as smooth and comfortable as possible.
              </p>
            </td>
          </tr>

          <!-- DIVIDER WITH ICON -->
          <tr>
            <td style="padding: 36px 40px; text-align:center;">
              <div style="display:inline-block; background:#f0f7ff; border-radius:12px; padding:24px 40px; width:80%; max-width:380px;">
                <p style="margin:0; font-size:32px;">🏥</p>
                <p style="margin:12px 0 0; font-size:14px; color:#1a73e8; font-weight:600; line-height:1.7;">
                  Your account is now active.<br/>You can start booking your queue anytime.
                </p>
              </div>
            </td>
          </tr>

          <!-- WHAT'S NEXT -->
          <tr>
            <td style="padding: 0 40px;">
              <p style="margin:0 0 16px; font-size:13px; color:#888; text-transform:uppercase; letter-spacing:2px; font-weight:700;">What's Next</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f0f0f0; vertical-align:top; width:36px; font-size:20px;">📅</td>
                  <td style="padding:14px 0 14px 12px; border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0; font-size:14px; color:#1a1a2e; font-weight:600;">Book your appointment</p>
                    <p style="margin:4px 0 0; font-size:13px; color:#777;">Choose your department, date, and preferred time slot.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f0f0f0; vertical-align:top; width:36px; font-size:20px;">📩</td>
                  <td style="padding:14px 0 14px 12px; border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0; font-size:14px; color:#1a1a2e; font-weight:600;">Receive your queue number</p>
                    <p style="margin:4px 0 0; font-size:13px; color:#777;">A confirmation email with your queue details will be sent to you.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0; vertical-align:top; width:36px; font-size:20px;">✅</td>
                  <td style="padding:14px 0 14px 12px;">
                    <p style="margin:0; font-size:14px; color:#1a1a2e; font-weight:600;">Arrive & check in</p>
                    <p style="margin:4px 0 0; font-size:13px; color:#777;">Show your queue number at the reception desk and you're all set.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td style="padding: 36px 40px; text-align:center;">
              <a href="#" style="display:inline-block; background:linear-gradient(135deg, #0f4c81, #1a73e8); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 36px; border-radius:50px; letter-spacing:0.3px;">Book Your First Appointment →</a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f8faff; padding: 28px 40px; text-align:center; border-top:1px solid #e8ecf0;">
              <p style="margin:0; font-size:14px; color:#555;">Need help? Contact us at <a href="mailto:support@cityhospital.com" style="color:#1a73e8; text-decoration:none;">support@cityhospital.com</a></p>
              <p style="margin:12px 0 0; font-size:11px; color:#aaa;">This is an automated message. Please do not reply directly to this email.</p>
              <p style="margin:6px 0 0; font-size:11px; color:#aaa;">© 2026 City General Hospital. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
 }

 export default RegisterUserHtml