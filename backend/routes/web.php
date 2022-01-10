<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function () use ($router) {

    // Auth group
    $router->group(['prefix' => 'auth'], function () use ($router) {

        // Login to get jwt credentials
        $router->post('login', 'AuthenticationController@login');
    });

    // Bookings group
    $router->group(['prefix' => 'bookings', 'middleware' => ['auth']], function () use ($router) {

        // index
        $router->get('/', 'BookingController@index');
        // new record
        $router->post('/', 'BookingController@newBooking');
    });


 });
