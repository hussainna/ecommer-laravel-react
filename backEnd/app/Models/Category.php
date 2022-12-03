<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table='category';
    protected $fillable=[
        'name',
        'slug',
        'title',
        'description',
        'meta_title',
        'meta_descrip',
        'meta_keyword',
        'status',
    ];
}
