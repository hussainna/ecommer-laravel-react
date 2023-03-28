<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Orders;
use App\Models\Cart;


class CheckoutController extends Controller
{
    public function placeOrder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator=Validator::make($request->all(),[
                'firstname'=>'required|max:191',
                'phone'=>'required|max:191',
                'lastname'=>'required|max:191',
                'email'=>'required|max:191',
                'address'=>'required|max:191',
                'city'=>'required|max:191',
                'state'=>'required|max:191',
                'zipcode'=>'required|max:191',
                
            ]);
            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }
            else
            {
                $user_id=auth('sanctum')->user()->id;

                $order=new Orders;
                $order->firstname=$request->firstname;
                $order->user_id=auth('sanctum')->user()->id;
                $order->lastname=$request->lastname;
                $order->phone=$request->phone;
                $order->email=$request->email;
                $order->city=$request->city;
                $order->address=$request->address;
                $order->state=$request->state;
                $order->zipcode=$request->zipcode;

                $order->payment_mode=$request->payment_mode;
                $order->payment_id=$request->payment_id;
                $order->tracking_no='fundaecom'.rand(1111,9999);
                $order->save();

                $cart=Cart::where('user_id',$user_id)->get();
                $OrderItems=[];
                foreach($cart as $item){
                    $OrderItems[]=[
                        'product_id'=>$item->product_id,
                        'qty'=>$item->product_qty,
                        'price'=>$item->products->price,

                    ];
                    $item->products->update([
                        'qty'=>$item->products->qty - $item->product_qty
                    ]);
                }
                $order->orderitems()->createMany($OrderItems);
                Cart::destroy($cart);
                return response()->json([
                    'status'=>200,
                    'message'=>'Order  Placed Success'
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login To Place Order'
            ]);
        }
    }
}
