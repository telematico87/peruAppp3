<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Traits\ApiResponse;

class AuthenticationController extends Controller
{
    use ApiResponse;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     *  JWT credentials
     *
     * @param  Request $request
     * @return Response
     */
    public function login(Request $request)
    {
        // Validate request
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user_data = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($user_data)) {
            return $this->errorResponse('Unauthorized', 401);
        }

        return $this->respondWithToken($token);
    }
}
