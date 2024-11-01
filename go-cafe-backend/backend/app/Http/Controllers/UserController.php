<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\VerificationEmail;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
 * Store a newly created resource in storage.
 */

 public function store(Request $request)
 {
     try {
         $validatedData = $request->validate([
             'name' => 'required|string|max:255',
             'email' => 'required|string|email|max:255|unique:users',
             'password' => 'required|string|min:8',
             'remember_me' => 'boolean',
         ], [
             'email.unique' => 'Email already in use, please Log In',
         ]);
 
         $email_verification_token = Str::random(60);
 
         $user = User::create([
             'name' => $validatedData['name'],
             'email' => $validatedData['email'],
             'password' => Hash::make($validatedData['password']),
             'email_verification_token' => $email_verification_token,
             //'role' => 'superadmin'
         ]);
 
         // $token = $user->createToken('auth_token')->plainTextToken;
 
         Mail::to($user->email)->send(new VerificationEmail($user->email ,$email_verification_token));
 
         return response()->json([
             'user' => $user,
             'message' => 'Please check your email for verification.',
             'email_verification_token' => $email_verification_token
         ], 201);
 
     } catch (ValidationException $e) {
         return response()->json([
             'message' => 'Validation failed',
             'errors' => $e->errors(),
         ], 422);
     }
 }

 public function login(Request $request)
{
    $validatedData = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:8',
    ]);

    if (Auth::attempt($validatedData)) {
        $user = Auth::user();
        $user_ip = $request->header('X-Forwarded-For') ?? $request->ip();

        switch($user->role){
            case 'superadmin':
                $token = $user->createToken('auth_superadmin_token')->plainTextToken;
                break;
            case 'admin':
                $token = $user->createToken('auth_admin_token', ['access-admin-panel', 'destroy-feedback', 'send-email'])->plainTextToken;
                break;
            case 'client':
                $token = $user->createToken('auth_login_token', ['test'])->plainTextToken;
                break;
        }

        return response()->json([
            'message' => 'Welcome ' . $user->name,
            'user' => $user,
            'token' => $token,
            'user_ip' => $user_ip
        ]);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}


    public function get_user()
{
    if (Auth::check()) {
        return response()->json(Auth::user());
    }
    return response()->json(['message' => 'User not authenticated'], 401);
}




    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_name(Request $request, string $id)
    {
        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|string|min:3|max:255',
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->name = $validatedData['name'];
        $user->save();

        return response()->json(['message' => 'Name updated successfully'], 200);
    }

    public function update_password(Request $request)
{
    $validatedData = $request->validate([
        'oldPassword' => 'required|string|min:8|max:255',
        'newPassword' => 'required|string|min:8|max:255',
    ]);

    $user = Auth::user(); 

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    if (!Hash::check($validatedData['oldPassword'], $user->password)) {
        return response()->json(['error' => 'Wrong Password'], 401);
    }

    $user->password = Hash::make($validatedData['newPassword']);
    $user->save();

    return response()->json(['message' => 'Password altered successfully'], 200);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
{
    $user = Auth::user(); 

    if ($user) {
        $user->delete();

        $user->tokens()->delete();

        return response()->json(['message' => 'Account deleted successfully.'], 200);
    }

    return response()->json(['message' => 'User not found.'], 404);
}

    
}
