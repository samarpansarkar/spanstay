export const resetPasswordTemplate = (resetUrl, userName) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #2563eb; margin: 0; font-size: 24px; }
    .content { color: #374151; font-size: 16px; line-height: 1.6; }
    .button-container { text-align: center; margin: 30px 0; }
    .button { background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; }
    .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #9ca3af; }
    .url-text { word-break: break-all; color: #6b7280; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SpanStay</h1>
    </div>
    <div class="content">
      <p>Hi ${userName},</p>
      <p>We received a request to reset the password for your SpanStay account. If you made this request, please click the button below to choose a new password:</p>
      <div class="button-container">
        <a href="${resetUrl}" class="button" style="color: #ffffff;">Reset Password</a>
      </div>
      <p>This link will expire in 15 minutes.</p>
      <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
      <p class="url-text">If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${resetUrl}">${resetUrl}</a></p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} SpanStay. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
