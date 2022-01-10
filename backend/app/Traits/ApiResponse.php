<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponse
{
    /**
     * Trait that format all success responses
     * to JSON Type
     */
    public function successResponse($data, $code = Response::HTTP_OK)
    {
        return response()->json(['response' => $data], $code);
    }

    /**
     * Trait that create all error responses
     * to JSON Type
     */
    public function errorResponse($message, $code)
    {
        return response()->json(['error' => $message, 'code' => $code], $code);
    }
}
