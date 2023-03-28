<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Products;

class Cart extends Model
{
    use HasFactory;
    protected $table='cart';
    protected $fillable=[
        'product_id',
        'product_qty',
        'user_id',
    ];


    protected $with=['products'];
public function products()
{
    return $this->belongsTo(Products::class,'product_id','id');
}

}
