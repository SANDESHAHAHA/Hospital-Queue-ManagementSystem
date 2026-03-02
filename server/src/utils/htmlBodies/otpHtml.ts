
const otpHtml = (otp:string)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login OTP</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f4f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f4c81 0%, #1a73e8 100%); padding: 44px 40px 36px; text-align:center;">
              <div style="display:inline-block; background:rgba(255,255,255,0.15); border-radius:50%; width:70px; height:70px; line-height:70px; font-size:34px; margin-bottom:16px;">🔐</div>
              <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700; letter-spacing:-0.5px;">Login Verification</h1>
              <p style="margin:10px 0 0; color:#c8e0ff; font-size:14px;">City General Hospital — Queue Management System</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 40px 40px 0; text-align:center;">
              <p style="margin:0; font-size:15px; color:#555; line-height:1.8;">
                We received a login request for your account. Use the OTP below to complete your sign-in. 
                <strong style="color:#e53e3e;">Do not share this code with anyone.</strong>
              </p>
            </td>
          </tr>

          <!-- OTP BOX -->
          <tr>
            <td style="padding: 36px 40px; text-align:center;">
              <div style="display:inline-block; background:linear-gradient(135deg, #e8f0fe, #d2e3fc); border: 2px dashed #1a73e8; border-radius:16px; padding: 24px 52px;">
                <p style="margin:0; font-size:12px; color:#1a73e8; letter-spacing:3px; text-transform:uppercase; font-weight:700;">Your One-Time Password</p>
                <p style="margin:12px 0 0; font-size:52px; font-weight:800; color:#0f4c81; letter-spacing:10px; font-variant-numeric: tabular-nums;">${otp}</p>
                <p style="margin:12px 0 0; font-size:12px; color:#e53e3e; font-weight:600;">⏱ Expires in 10 minutes</p>
              </div>
            </td>
          </tr>

          <!-- WARNING BOX -->
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff5f5; border-left:4px solid #e53e3e; border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0; font-size:13px; color:#c53030; font-weight:700;">🚨 Security Notice</p>
                    <ul style="margin:8px 0 0; padding-left:18px; font-size:13px; color:#9b2c2c; line-height:1.8;">
                      <li>Never share this OTP with anyone, including hospital staff.</li>
                      <li>City General Hospital will <strong>never</strong> ask for your OTP.</li>
                      <li>If you didn't request this, please ignore this email.</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- STEPS -->
          <tr>
            <td style="padding: 30px 40px 0;">
              <p style="margin:0 0 16px; font-size:13px; color:#888; text-transform:uppercase; letter-spacing:2px; font-weight:700;">How to use</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #f0f0f0; vertical-align:middle; width:36px; font-size:20px;">1️⃣</td>
                  <td style="padding:12px 0 12px 12px; border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0; font-size:14px; color:#1a1a2e;">Go back to the login page.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #f0f0f0; vertical-align:middle; font-size:20px;">2️⃣</td>
                  <td style="padding:12px 0 12px 12px; border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0; font-size:14px; color:#1a1a2e;">Enter the 6-digit OTP shown above.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; vertical-align:middle; font-size:20px;">3️⃣</td>
                  <td style="padding:12px 0 12px 12px;">
                    <p style="margin:0; font-size:14px; color:#1a1a2e;">You're in! Access your queue dashboard.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f8faff; padding: 28px 40px; margin-top:36px; text-align:center; border-top:1px solid #e8ecf0;">
              <p style="margin:0; font-size:14px; color:#555;">
                Need help? Contact us at 
                <a href="mailto:support@cityhospital.com" style="color:#1a73e8; text-decoration:none;">support@cityhospital.com</a>
              </p>
              <p style="margin:12px 0 0; font-size:11px; color:#aaa;">This is an automated message. Please do not reply directly to this email.</p>
              <p style="margin:6px 0 0; font-size:11px; color:#aaa;">© 2026 City General Hospital. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`
}

export default otpHtml