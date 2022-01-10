<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;

use App\Traits\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Database\QueryException;

use Throwable;
use ErrorException;
use Exception;

class Handler extends ExceptionHandler
{
    use ApiResponse;

    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        /**
         * Conditional for all other errors
         * by conditional in .ENV for debug true
         */
        if(env('APP_DEBUG', false)){
            return parent::render($request, $exception);
        }

        /**
         * All possible exceptions
         * passed trough our API Response Trait
         * to get back readeable errors in json
         */
        if ($exception instanceof HttpException){
            $code = $exception->getStatusCode();
            $message = Response::$statusTexts[$code];
            return $this->errorResponse($message, $code, 'HttpException');
        }

        if ($exception instanceof ModelNotFoundException){
            $model = strtolower(class_basename($exception->getModel()));
            return $this->errorResponse("Registro no encontrado en base de datos! ({$model})", Response::HTTP_NOT_FOUND, 'ModelNotFoundException');
        }

        if ($exception instanceof QueryException){
            $message = $exception->getPrevious()->getMessage();
            return $this->errorResponse($message, Response::HTTP_INTERNAL_SERVER_ERROR, 'QueryException');
        }

        // If we are using form request, this validation will be overwritted
        if ($exception instanceof ValidationException){
            $errors = $exception->validator->errors()->getMessages();
            return $this->errorResponse($errors, Response::HTTP_UNPROCESSABLE_ENTITY, 'ValidationException');
        }

        if ($exception instanceof Exception){
            $message = $exception->getMessage();
            return $this->errorResponse($message, Response::HTTP_INTERNAL_SERVER_ERROR, 'Exception');
        }

        if ($exception instanceof ErrorException){
            $message = $exception->getMessage();
            return $this->errorResponse($message, Response::HTTP_INTERNAL_SERVER_ERROR, 'ErrorException');
        }
    }
}
