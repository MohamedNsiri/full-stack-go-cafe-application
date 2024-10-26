<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
</head>
<body style="font-family: 'Montserrat', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; padding: 20px; border: 1px solid #dddddd;">
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <h1 style="color: #f5b456; font-size: 24px; margin: 0; font-weight: 600;">Go Cafe Email Verification</h1>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 10px 0;">
                <p style="font-size: 16px; color: #333333; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">
                    Please click the button below to verify your email address:
                </p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px 0;">
                <a href="http://localhost:4200/email_verification?email={{ urlencode($email) }}&token={{ urlencode($token) }}" 
                   style="background-color: #f5b456; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; font-family: 'Montserrat', Arial, sans-serif;">
                   Verify Email
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 10px 0;">
                <p style="font-size: 14px; color: #666666; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">
                    If you did not request this email, please ignore it.
                </p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 20px;">
                <p style="font-size: 12px; color: #aaaaaa; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">
                    © 2024 Go Cafe. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
