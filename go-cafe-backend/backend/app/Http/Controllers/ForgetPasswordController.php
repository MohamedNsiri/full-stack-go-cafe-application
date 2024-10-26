<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ForgetPasswordController extends Controller
{
    public function forget_password(Request $request)
{
    $validatedData = $request->validate([
        'email' => 'required|string|email|exists:users,email', 
    ]);

    $user = User::where('email', $validatedData['email'])->first();

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $token = Str::random(60);

    DB::table('password_reset_tokens')->where('email', $validatedData['email'])->delete();

    DB::table('password_reset_tokens')->insert([
        'email' => $validatedData['email'],
        'token' => Hash::make($token),
        'created_at' => Carbon::now(),
    ]);

    Mail::to($user->email)->send(new PasswordResetEmail($token, $user->email));

    return response()->json([
        'message' => 'Password reset link sent to your email.',
        'email' => $validatedData['email'],
    ], 200);
}

    public function reset_password(Request $request)
{   
        $email = $request->input('email');
        $token = $request->input('token');
        $password = $request->input('newPassword');

        $token_to_verify_with = DB::table('password_reset_tokens')->where('email', $email)->first();

        if(!$token_to_verify_with->token || !Hash::check($token, $token_to_verify_with->token)){
            return response()->json(['error' => 'Invalid token'], 401);
        }

        $user = DB::table('users')->where('email', $email)->first();

        if(!$user){
            return response()->json(['error' => 'User not found'], 404);
        }

        DB::table('users')->where('email', $email)->update(['password' => Hash::make($password)]);

        return response()->json(['message' => 'Password reset successfully'], 200);
}
}
