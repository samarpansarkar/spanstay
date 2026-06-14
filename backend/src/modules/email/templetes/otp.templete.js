export const otpTemplate = (otp, userName) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #2563eb; margin: 0; font-size: 24px; }
    .content { color: #374151; font-size: 16px; line-height: 1.6; text-align: center; }
    .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1e40af; margin: 30px 0; padding: 15px; background-color: #f3f4f6; border-radius: 8px; display: inline-block; }
    .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SpanStay</h1>
    </div>
    <div class="content">
      <p>Hi ${userName},</p>
      <p>Thank you for registering! Please use the verification code below to verify your email address and activate your account.</p>
      <div class="otp-code">${otp}</div>
      <p>This code is valid for 10 minutes.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} SpanStay. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
