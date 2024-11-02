<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie',
        '/create_account', '/login',
        '/user', '/update_name/{id}',
        '/email_verification', '/resend_email_verification',
        '/forget_password', '/reset_password'],

    'allowed_methods' => ['*'], // Allow all HTTP methods

    'allowed_origins' => ['https://full-stack-go-cafe-application.vercel.app', 'https://gocafe.netlify.app', 'http://localhost:4200'], // The base URL of your Angular app (omit the route)

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Allow credentials such as cookies

];
