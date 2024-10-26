<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            padding: 20px;
            width: 600px;
            margin: 20px auto;
        }
        h1 {
            color: #f5b456;
            font-size: 24px;
            text-align: center;
        }
        p {
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
        a {
            display: inline-block;
            background-color: #f5b456;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }
        a:hover {
            background-color: #e0a644;
        }
        .footer-text {
            font-size: 14px;
            color: #666666;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <table align="center" cellpadding="0" cellspacing="0" class="email-container">
        <tr>
            <td align="center">
                <h1>Password Reset Request</h1>
            </td>
        </tr>
        <tr>
            <td>
                <p>Hello,</p>
                <p>We received a request to reset your password. If you did not request a password reset, please ignore this email.</p>
                <p>To reset your password, click the button below:</p>
                <p align="center">
                    <a href="{{ $resetUrl }}">Reset Password</a>
                </p>
                <p>This link will expire in 60 minutes.</p>
                <p>Thank you!</p>
            </td>
        </tr>
        <tr>
            <td class="footer-text">
                <p>© 2024 Your Company. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
