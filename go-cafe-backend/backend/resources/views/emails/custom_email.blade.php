<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Response To Feedback</title>
    <!-- Import Montserrat from Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
    <style>
        body {
            font-family: 'Montserrat', Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            padding: 20px;
            max-width: 600px;
            margin: 20px auto;
            text-align: center;
        }
        h1 {
            font-family: 'Montserrat', Arial, sans-serif;
            color: #f5b456;
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        p {
            font-family: 'Montserrat', Arial, sans-serif;
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>About your Feedback..</h1>
        <p>{{ $email_body }}</p>
    </div>
</body>
</html>
