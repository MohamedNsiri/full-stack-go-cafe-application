<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SuperAdminController extends Controller
{
    public function add_admin(Request $request)
    {
        $request->validate([
            'email_to_make_admin' => 'required|string|email|max:255|exists:users,email', 
            'super_admin_password' => 'required|string|min:8|max:255',
        ]);

        $superadmin = Auth::user();

        $attemptCount = session()->get('superadmin_failed_attempts', 0);

        if (!Hash::check($request->super_admin_password, $superadmin->password)) {
            session()->put('superadmin_failed_attempts', ++$attemptCount);

            if ($attemptCount >= 4) {
                session()->forget('superadmin_failed_attempts');
                // Mail::to($superadmin->email)->send(new Warning());
                return response()->json(['error' => 'Compromised'], 401);
            }

            return response()->json(['error' => 'Wrong Password'], 401);
        }

        session()->forget('superadmin_failed_attempts');

        $user = User::where('email', $request->email_to_make_admin)->first();
        if ($user->role === 'admin') {
            return response()->json(['message' => 'User is already an admin'], 400);
        }

        if($superadmin->tokenCan('make-admin')){
            $user->role = 'admin';
            $user->save();
        }else{
            return response()->json(['error' => 'You do not have permission to make an admin'], 400);
        }

        // Mail::to($superadmin->email)->send(new ConfirmedAdminstration($user->email));
        return response()->json(['message' => $user->name . ' has been promoted to admin'], 200);
    }

    public function remove_admin(Request $request)
    {
        $request->validate([
            'email_to_remove_admin' => 'required|string|email|max:255|exists:users,email', 
            'super_admin_password' => 'required|string|min:8|max:255',
        ]);

        $superadmin = Auth::user();

        $attemptCount = session()->get('superadmin_failed_attempts', 0);

        if (!Hash::check($request->super_admin_password, $superadmin->password)) {
            session()->put('superadmin_failed_attempts', ++$attemptCount);

            if ($attemptCount >= 4) {
                session()->forget('superadmin_failed_attempts');
                return response()->json(['error' => 'Compromised'], 401);
            }

            return response()->json(['error' => 'Wrong Password'], 401);
        }

        session()->forget('superadmin_failed_attempts');

        $user = User::where('email', $request->email_to_remove_admin)->first();
        if ($user->role === 'client') {
            return response()->json(['message' => 'User is already not an admin'], 400);
        }

        if($superadmin->tokenCan('remove-admin')){
            $user->role = 'client';
            $user->save();
        }else{
            return response()->json(['error' => 'You do not have permission to remove an admin'], 400);
        }

        return response()->json(['message' => $user->name . ' has been downgrated to client'], 200);

    }
}
