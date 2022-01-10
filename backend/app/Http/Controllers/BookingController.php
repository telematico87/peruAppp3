<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class BookingController extends Controller
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

    public function index(Request $request)
    {

        $bookingId=$request->get('bookingId');
        $bookingPrice=$request->get('bookingPrice');
        $wherePrice=$request->get('wherePrice');

        $bookings = Booking::byId($bookingId)->byPrice($bookingPrice,$wherePrice)->get();

        return $this->successResponse($bookings);
    }

    public function newBooking(Request $request)
    {
        // Validate request
        $this->validate($request, [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'bookingTime' => 'required|date',
            'streetAddress' => 'required|string',
            'bookingPrice' => 'required|numeric',
        ]);

        //get info of request
        $firstName=$request->input('firstName');
        $lastName=$request->input('lastName');
        $streetAddress=$request->input('streetAddress');
        $bookingTime =$request->input('bookingTime');
        $bookingPrice =$request->input('bookingPrice');
        //new Record
        $booking = new Booking();

        $booking->firstName = $firstName;
        $booking->lastName = $lastName;
        $booking->streetAddress =  $streetAddress;
        $booking->bookingTime = $bookingTime;

        $booking->bookingPrice =  $bookingPrice;
        //save
        $booking->save();

        return $this->successResponse($booking, 201);
    }
}
