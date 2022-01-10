<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'streetAddress',
        'bookingTime',
        'bookingPrice'
    ];

    /**
     * Scope filter By Id
     *
     * @param integer $id
     * @param \Illuminate\Database\Eloquent\Builder $query the eloquent query instance
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeById($query, string $id = null)
    {
        if (isset($id)) {
            return $query->where('id', $id);
        }
        return $query;
    }

    /**
     * Scope filter By Price
     *
     * @param integer $price
     * @param \Illuminate\Database\Eloquent\Builder $query the eloquent query instance
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByPrice($query, string $price = null, $where_price = null)
    {
        // Default filter by like only if where_price is empty
        if ($price && !$where_price) {
            return $query->where('bookingPrice', $price);
        }

        // Filter considering where if have both values
        if ($price && $where_price) {
            $where = $where_price == 'minor_equal' ? '<=' : '>=';
            return $query->where('bookingPrice', $where, $price);
        }

        return $query;
    }

}
