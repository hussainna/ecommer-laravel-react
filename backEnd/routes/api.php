<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;


/*
|-------------------------  
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::get('get-products',[FrontendController::class,'product']);
Route::get('single-product/{id}',[FrontendController::class,'single']);
Route::post('insert-cart',[CartController::class,'insert']);
Route::get('get-cart',[CartController::class,'cart']);
Route::delete('delete-cart/{id}',[CartController::class,'remove']);
Route::post('place-order',[CheckoutController::class,'placeOrder']);

Route::middleware(['auth:sanctum','IsAPIAdmin'])->group(function(){

    Route::get('authcheck',function(){
        return response()->json(['message'=>'you are in','status'=>200],200);

    });

    Route::post('store-category',[CategoryController::class,'store']);
    Route::get('admin/category',[CategoryController::class,'index']);
    Route::get('admin/edit-category/{id}',[CategoryController::class,'edit']);
    Route::put('/category-update/{id}',[CategoryController::class,'update']);
    Route::delete('/delete-category/{id}',[CategoryController::class,'delete']);
    Route::get('/all-category',[CategoryController::class,'allCategory']);

    //Products Routers

    Route::post('/insert-product',[ProductController::class,'insert']);
    Route::get('/view-products',[ProductController::class,'view']);
    Route::get('/edit-products/{id}',[ProductController::class,'all']);
    Route::post('/update-product/{id}',[ProductController::class,'update']);
    Route::delete('/delete-product/{id}',[ProductController::class,'delete']);

});

Route::middleware('auth:sanctum')->group(function(){

    Route::post('logout',[AuthController::class,'logout']);


});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
