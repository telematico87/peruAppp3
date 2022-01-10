<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Booking::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'firstName' => $this->faker->name,
            'lastName' => $this->faker->name,
            'bookingTime' => $this->faker->dateTime,
            'streetAddress' => $this->faker->address,
            'bookingPrice' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 1000)
        ];
    }
}
