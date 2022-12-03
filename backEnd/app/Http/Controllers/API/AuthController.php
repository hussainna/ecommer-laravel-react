<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name' => 'required|max:191',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $user=User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
            'status'=>200,
            'message'=>'Register Successfully',
            'username'=>$user->name,
            'token'=>$token,
        ]);

        }
    }
    public function login(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);   
        }
        else
        {
            $user = User::where('email', $request->email)->first();
 
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'invaild creatials'
                ]);
            }
            else
            {
                if($user->role_as==1)
                {
                    $token = $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
                }
                else
                {
                    $token = $user->createToken($user->email.'_Token',[''])->plainTextToken;
                }
                return response()->json([
                'status'=>200,
                'message'=>'Login Successfully',
                'username'=>$user->name,
                'token'=>$token,
            ]);
    
            }
                     
        }
    }

    public function logout(Request $request){
        if ($request->user()) { 
            $request->user()->tokens()->delete();
        }
        return response()->json([
            'status'=>200,
            'message'=>'Logout Successfully',
        ]);
    }


}











































