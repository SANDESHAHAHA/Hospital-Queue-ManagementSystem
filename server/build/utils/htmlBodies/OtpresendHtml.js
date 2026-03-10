export const resentHtmlOtp = (otp) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Resent Email Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #e9e9ef; font-family: 'DM Sans', Arial, sans-serif; min-height: 100vh; }

    .chrome {
      background: #1e1e2e;
      padding: 13px 20px;
      display: flex;
      align-items: center;
      gap: 7px;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .dot { width: 13px; height: 13px; border-radius: 50%; }
    .dot-r { background: #ff5f57; }
    .dot-y { background: #febc2e; }
    .dot-g { background: #28c840; }
    .chrome-label { margin-left: 10px; font-size: 12px; color: #6e6e8e; font-family: 'DM Mono', monospace; }

    .meta {
      background: #fff;
      border-bottom: 1px solid #e4e4e7;
      padding: 16px 28px;
    }
    .meta-subject { font-size: 17px; font-weight: 700; color: #09090b; margin-bottom: 10px; }
    .meta-row { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #71717a; margin-bottom: 4px; }
    .meta-row b { color: #09090b; font-weight: 600; }
    .badge {
      background: #f0fdf4; color: #16a34a;
      border: 1px solid #bbf7d0;
      border-radius: 99px;
      font-size: 10.5px; font-weight: 700;
      padding: 2px 9px; letter-spacing: 0.04em;
    }

    .body-wrap { background: #f0f0f5; padding: 36px 20px 48px; }

    .card {
      background: #fff;
      border-radius: 16px;
      border: 1px solid #e4e4e7;
      max-width: 480px;
      margin: 0 auto;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.09);
    }

    .accent { height: 4px; background: linear-gradient(90deg,#86efac,#16a34a,#15803d); }

    .header { padding: 36px 40px 0; text-align: center; }
    .icon-box {
      width: 56px; height: 56px;
      background: #f0fdf4;
      border: 1.5px solid #bbf7d0;
      border-radius: 14px;
      display: inline-flex; align-items: center; justify-content: center;
      margin-bottom: 20px;
    }
    .header h1 { font-size: 22px; font-weight: 700; color: #09090b; letter-spacing: -0.02em; margin-bottom: 8px; }
    .header p { font-size: 14px; color: #71717a; line-height: 1.65; }

    .otp-section { padding: 28px 40px; }
    .otp-box {
      background: #f0fdf4;
      border: 1.5px solid #bbf7d0;
      border-radius: 14px;
      padding: 28px 20px;
      text-align: center;
    }
    .otp-label {
      font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: #16a34a; margin-bottom: 16px;
    }
    .digits { display: flex; justify-content: center; gap: 7px; margin-bottom: 16px; }
    .digit {
      width: 54px; height: 60px;
      background: #fff;
      border: 1.5px solid #bbf7d0;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Mono', monospace;
      font-size: 28px; font-weight: 500;
      color: #15803d;
      box-shadow: 0 2px 8px rgba(22,163,74,0.1);
    }
    .expiry { font-size: 12.5px; color: #71717a; }
    .expiry b { color: #09090b; }

    .steps { padding: 0 40px 28px; }
    .steps-title {
      font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #a1a1aa; margin-bottom: 14px;
    }
    .step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 11px; }
    .step-num {
      width: 22px; height: 22px; flex-shrink: 0;
      background: #16a34a; color: #fff;
      border-radius: 50%; font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      margin-top: 1px;
    }
    .step p { font-size: 13.5px; color: #3f3f46; line-height: 1.55; }

    .warning {
      margin: 0 40px 28px;
      background: #fefce8; border: 1px solid #fef08a;
      border-radius: 10px; padding: 14px 16px;
      font-size: 12.5px; color: #854d0e; line-height: 1.6;
    }

    .divider { border: none; border-top: 1px solid #f4f4f5; margin: 0 40px; }

    .footer { padding: 22px 40px 32px; text-align: center; }
    .footer p { font-size: 12px; color: #a1a1aa; line-height: 1.75; }
    .footer-links { display: flex; justify-content: center; gap: 16px; margin-top: 8px; }
    .footer-links a { font-size: 11.5px; color: #a1a1aa; text-decoration: underline; }

    @media (max-width: 520px) {
      .header, .otp-section, .steps, .warning, .footer { padding-left: 24px; padding-right: 24px; }
      .divider { margin: 0 24px; }
      .digit { width: 42px; height: 50px; font-size: 22px; }
    }
  </style>
</head>
<body>

  <!-- Client chrome -->
  <div class="chrome">
    <div class="dot dot-r"></div>
    <div class="dot dot-y"></div>
    <div class="dot dot-g"></div>
    <span class="chrome-label">Mail — nodemailer html preview</span>
  </div>

  <!-- Email meta -->
  <div class="meta">
    <div class="meta-subject">🔐 ${otp} — Your new verification code</div>
    <div class="meta-row">From: <b>MyApp Security &lt;no-reply@myapp.com&gt;</b></div>
    <div class="meta-row">To: <b>user@example.com</b> <span class="badge">✦ Resent</span></div>
  </div>

  <!-- Email body -->
  <div class="body-wrap">
    <div class="card">

      <div class="accent"></div>

      <!-- Header -->
      <div class="header">
        <div class="icon-box">
          <svg width="26" height="26" fill="none" stroke="#16a34a" stroke-width="1.75" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke-linecap="round"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M22 7l-10 7L2 7"/>
          </svg>
        </div>
        <h1>New verification code</h1>
        <p>You requested a new OTP.<br/>Use the code below to verify your email address.</p>
      </div>

      <!-- OTP -->
      <div class="otp-section">
        <div class="otp-box">
          <div class="otp-label">Your one-time code</div>
          <div class="digits">
            ${otp
    .padEnd(6, ' ')
    .slice(0, 6)
    .split("")
    .map((d) => `<div class="digit">${d === ' ' ? '&nbsp;' : d}</div>`)
    .join("")}
          </div>
          <div class="expiry">⏱ Expires in <b>2 minutes</b> — do not share this code</div>
        </div>
      </div>

      <!-- Steps -->
      <div class="steps">
        <div class="steps-title">How to use</div>
        <div class="step">
          <div class="step-num">1</div>
          <p>Go back to the verification page on your browser or app.</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <p>Enter the 6-digit code exactly as shown above.</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <p>Click <b>Verify OTP</b> to complete your verification.</p>
        </div>
      </div>

      <!-- Warning -->
      <div class="warning">
        ⚠️ <b>Never share this code.</b> Our team will never ask for your OTP via email, phone, or chat. If you didn't request this, please secure your account immediately.
      </div>

      <hr class="divider"/>

      <!-- Footer -->
      <div class="footer">
        <p>If you didn't request a new code, you can safely ignore this email.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Help Center</a>
          <a href="#">Unsubscribe</a>
        </div>
        <p style="margin-top:10px;">© 2026 MyApp · All rights reserved</p>
      </div>

    </div>
  </div>

</body>
</html>`;
//# sourceMappingURL=OtpresendHtml.js.map