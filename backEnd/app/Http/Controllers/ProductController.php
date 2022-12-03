<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    public function insert(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'category_id'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
            'meta_title'=>'required|max:191',
            'brand'=>'required|max:20',
            'price'=>'required|max:20',
            'qty'=>'required|max:4',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',

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
            $product=new Products;
            $product->category_id=$request->input('category_id');
            $product->slug=$request->input('slug');
            $product->name=$request->input('name');
            $product->description=$request->input('description');

            $product->meta_title=$request->input('meta_title');
            $product->meta_keyword=$request->input('meta_keyword');
            $product->meta_descrip=$request->input('meta_descrip');

            $product->brand=$request->input('brand');
            $product->price=$request->input('price');
            $product->qty=$request->input('qty');

            if($request->hasFile('image'))
            {
                $file=$request->file('image');
                $extension=$file->getClientOriginalExtension();
                $filename=time().'.'.$extension;
                $file->move('uploads/product/',$filename);
                $product->image='uploads/product/'.$filename;
            }

            $product->featured=$request->input('featured');
            $product->popular=$request->input('popular');
            $product->status=$request->input('status');

            $product->save();
            return response()->json([
                'status'=>200,
                'message'=>'the product item added successfully'
            ]);

        }

    }
    public function view()
    {
        $products=Products::all();
        return response()->json([
            'status'=>200,
            'products'=>$products,
        ]);
    }
    public function all($id)
    {
        $product=Products::find($id);
        return response()->json([
            'status'=>200,
            'product'=>$product
        ]);
    }
    public function update(Request $request,$id)
    {

        $product=Products::find($id);
        
        if($product)
        {
            $product->category_id=$request->input('category_id');
            $product->slug=$request->input('slug');
            $product->name=$request->input('name');
            $product->description=$request->input('description');

            $product->meta_title=$request->input('meta_title');
            $product->meta_keyword=$request->input('meta_keyword');
            $product->meta_descrip=$request->input('meta_descrip');

            $product->brand=$request->input('brand');
            $product->price=$request->input('price');
            $product->qty=$request->input('qty');

            if($request->hasFile('image'))
            {
                $path=$product->image;
                if(File::exists($path))
                {
                    File::delete($path);
                }
        $file=$request->file('image');
        $extension=$file->getClientOriginalExtension();
        $filename=time().'.'.$extension;
         $file->move('uploads/product/',$filename);
        $product->image='uploads/product/'.$filename;
            } 
           $product->status=$request->input('status')==true?'1':'0';
        $product->popular=$request->input('popular')==true?'1':'0';
        $product->featured=$request->input('featured')==true?'1':'0';

        $product->update();
        return response()->json([
            'status'=>200,
            'message'=>'The product Update Successfully',
        ]);

        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'product not found',
            ]);
        }
            
    }

    public function delete($id)
    {
        $product=Products::find($id);
        $product->delete();
        return response()->json([
            'status'=>200,
            'message'=>'product deleted',
        ]);
    }
}
