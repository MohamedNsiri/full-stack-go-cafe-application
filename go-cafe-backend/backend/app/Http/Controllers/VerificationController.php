<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;
use App\Mail\VerificationEmail;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {
        $email = $request->query('email');
        $token = $request->query('email_verification_token');

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        if ((string)trim($token) !== (string)trim($user->email_verification_token)) {
            return response()->json(['message' => 'Invalid or expired token.'], 400);
        }

        $user->email_verified_at = now();
        //if($user->role === 'superadmin'){
          //  $token = $user->createToken('auth_superadmin_token', ['access-admin-panel','make-admin','remove-admin'])->plainTextToken;
        //}else{
            $token = $user->createToken('auth_client_creation_token', ['test'])->plainTextToken;
        //}
        $user->save();

        return response()->json([
            'message' => 'Email verified successfully.',
            'token' => $token,
        ], 200);
    }

    public function resend(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email is already verified.'], 400);
        }

        $token = Str::random(60);
        $user->email_verification_token = $token;
        $user->save();

        Mail::to($user->email)->send(new VerificationEmail($request->email, $token));

        return response()->json(['message' => 'Verification email resent successfully.'], 200);
    }
}
