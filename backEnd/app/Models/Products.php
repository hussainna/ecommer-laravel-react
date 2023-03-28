<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Products extends Model
{
    use HasFactory;
    protected $table='products';
    protected $fillable=[
        'category_id',
        'meta_title',
        'meta_descrip',
        'meta_keyword',
        'name',
        'slug',
        'description',
        'brand',
        'featured',
        'selling_price',
        'original_price',
        'qty',
        'image',
        'popular',
        'status'
    ];
    protected $with=['category'];
    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }

}
