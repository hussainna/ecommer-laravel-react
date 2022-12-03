<?php

namespace App\Http\Controllers;
use App\Models\Products;

use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function product(Request $request)
    {
        $product=Products::all();
        return response()->json([
            'status'=>200,
            'product'=>$product,
        ]);
    }

    public function single($id)
    {
        $product=Products::find($id);
        return response()->json([
            'status'=>200,
            'product'=>$product,
        ]);
    }
}
