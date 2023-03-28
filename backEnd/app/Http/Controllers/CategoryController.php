<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'title'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'message'=>$validator->message(),
            ]);
        }
        else
        {
            $category=new Category;
            $category->name=$request->input('name');
            $category->slug=$request->input('slug');
            $category->description=$request->input('description');
            $category->title=$request->input('title');

            $category->meta_keyword=$request->input('meta_keyword');
            $category->meta_descrip=$request->input('meta_descrip');
            $category->meta_title=$request->input('meta_title');

            $category->status=$request->input('status')==true?'1':'0';

            $category->save();

            return response()->json([
                'status'=>200,
                'message'=>'Category Added Successfully'
            ]);

        }
    }

    public function index()
    {
        $category=Category::all();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }

    public function edit($id)
    {
        $category=Category::find($id);
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }

    public function update(Request $request ,$id)
    {
        $category=Category::find($id);
        $category->name=$request->input('name');
        $category->meta_keyword=$request->input('meta_keyword');
        $category->title=$request->input('title');
        $category->meta_descrip=$request->input('meta_decrip');
        $category->slug=$request->input('slug');
        $category->description=$request->input('description');
        $category->status=$request->input('status')==true?'1':'0';
        $category->update();
        return response()->json([
            'status'=>200,
            'message'=>'The Category Update Successfully',
        ]);
    }
    public function delete($id)
    {
        $category=Category::find($id);
        $category->delete();
        return response()->json([
            'status'=>200,
            'message'=>'category Deleted'
        ]);

    }

    public function allCategory()
    {
        $category=Category::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }
}
