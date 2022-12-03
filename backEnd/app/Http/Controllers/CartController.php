<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Cart;



class CartController extends Controller
{
    public function insert(Request $request)
    {

        if(auth('sanctum')->check())
        {

            $product_id=$request->product_id;
            $product_qty=$request->product_qty;
            $user_id=auth('sanctum')->user()->id;

            $productCheck=Products::where('id',$product_id)->first();
            if($productCheck)
            {
                if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>$productCheck->name.' This product already added to cart'
                    ]);
                }
                else
                {
                    $cartItem=new Cart;
                    $cartItem->user_id=$user_id;
                    $cartItem->product_id=$product_id;
                    $cartItem->product_qty=$product_qty;
                    $cartItem->save();
                    return response()->json([
                        'status'=>201,
                        'message'=>'Added To Cart'
                    ]);
                }
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'product not found'
                ]);
            }

        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'you are not login'
            ]);
        }
    }

    public function cart(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cartItem=Cart::where('user_id',$user_id)->get();
            return response()->json([
                'status'=>200,
                'cart'=>$cartItem,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'you are not login'
            ]);
        }
    }
    public function remove($id)
    {
        $cart=Cart::find($id);
        $cart->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Cart Item Deleted'
        ]);
    }
}
