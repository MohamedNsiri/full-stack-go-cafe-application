<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\superAdminController;
use App\Http\Controllers\AdminController;


Route::middleware(['api'])->group(function(){

    Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'get_user']);


    Route::post('/create_account', [UserController::class, 'store']);

    Route::post('/login', [UserController::class, 'login']);

    Route::post('/update_name/{id}', [UserController::class, 'update_name']);
    Route::post('/update_password', [UserController::class, 'update_password']
    )->middleware('auth:sanctum');

    Route::delete('/delete_account', [UserController::class, 'destroy']
    )->middleware('auth:sanctum');

    Route::post('/forget_password',[ForgetPasswordController::class, 'forget_password']);
    Route::post('/reset_password',[ForgetPasswordController::class, 'reset_password']);

    Route::get('/email_verification', [VerificationController::class, 'verify']);
    Route::post('/resend_email_verification', [VerificationController::class, 'resend']);

    Route::post('/submit_feedback', [FeedbackController::class, 'store']);
    Route::get('/get_feedbacks', [FeedbackController::class, 'show']
    )->middleware(['auth:sanctum', 'ability:access-admin-panel']);
    Route::post('/send_email', [FeedbackController::class, 'sendEmail']
    )->middleware(['auth:sanctum', 'abilities:access-admin-panel, send-email']);

    Route::post('/admin_panel', [AdminController::class, 'admin']
    )->middleware(['auth:sanctum', 'abilities:access-admin-panel']);

    Route::post('/super_admin_add', [superAdminController::class, 'add_admin']
    )->middleware(['auth:sanctum', 'abilities:access-admin-panel, make-admin']);

    Route::post('/super_admin_remove', [superAdminController::class, 'remove_admin']
    )->middleware(['auth:sanctum', 'abilities:access-admin-panel, remove-admin']);

});