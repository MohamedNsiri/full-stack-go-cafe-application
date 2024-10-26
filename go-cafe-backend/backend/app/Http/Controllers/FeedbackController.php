<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use App\Models\User;
use App\Models\Feedback;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Mail\CustomEmail;

class FeedbackController extends Controller
{

public function store(Request $request)

{
    try{
        $validatedData = $request->validate([
            'email' => 'required|email|max:255',
            'message_body' => 'required|max:300',
            'rating' => 'required|numeric|min:0|max:5'
        ]);

        $feedback= Feedback::create([
            'email' => $validatedData['email'],
            'message_body' => $validatedData['message_body'],
            'rating' => $validatedData['rating']
        ]);

        return response()->json([
            'message'=> 'Feedback submitted successfully'
        ], 201);

    }catch(ValidationException $e){
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);
    }
}

public function show(Request $request)
{   
    $admin = Auth::user();

    if ($admin->tokenCan('access-admin-panel')) {
        $feedbacks = Feedback::all();

        $feedbackWithUserNames = $feedbacks->map(function ($feedback) {
            $user = User::where('email', $feedback->email)->first();
            $feedbackArray = [$feedback->email, $user? $user->name: 'Unknown', $feedback->rating, $feedback->message_body, $feedback->id];

            return $feedbackArray;
        });

        return response()->json($feedbackWithUserNames);
    } else {
        return response()->json(['error' => 'Unauthorized'], 403);
    }    
}

public function destroy(Request $request)
{
    $request->validate([
        'id' => 'required|number'
    ]);

    $user = Auth::user();

    if($user->tokenCan('destroy-feedback')){
        $feedback = Feedback::find($request->id);
        if($feedback){
            $feedback->delete();
            return response()->json(['message' => 'Feedback deleted successfully'], 200);
        }else{
            return response()->json(['message' => 'Feedback not found'], 404);
        }
    }else{
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}

public function sendEmail(Request $request)
{
    $validatedData = $request->validate([
        'email' => 'required|string|email|max:255',
        'email_body' => 'required|string|max:300'
    ]);

    $user = Auth::user();
    
    
    if ($user->tokenCan('send-email')) {
        if (!empty($request->email_body)) {
            Mail::to($request->email)->send(new CustomEmail($request->email_body));
            return response()->json(['message' => 'Email sent successfully'], 200);
        } else {
            return response()->json(['error' => 'Email body is empty'], 400);
        }
    } else {
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}


}


