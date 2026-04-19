<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::select('id' , 'name' , 'description' , 'created_at')->withCount('products')->get() ;
        return response()->json(['data' => $categories] , 200) ;
    }

    public function options() {
        $categories = Category::select('id' , 'name')->get() ;
        return response()->json(['data' => $categories]) ;
    }

    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string' ,
            'description' => 'required|max:120'
        ]) ;

        $category = Category::create($validated) ;

        $category = Category::select('id' , 'name' , 'description' , 'created_at')->withCount('products')->find($category->id) ;
        return response()->json([
            'message' => "Category created successfully" ,
            'data' => $category 
        ]) ;
    }


    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
        $category = Category::findOrFail($id) ;
        $validated = $request->validate([
            'name' => 'required|string' ,
            'description' => 'required|max:120'
        ]); 

        $category->update($validated) ;

        $category = Category::select('id' , 'name' , 'description' , 'created_at')
        ->withCount('products')->find($category->id) ;

        return response()->json(['message' => "Product updated successfully" ,'data' => $category]) ;
    }

    public function delete(string $id)
    {
        //
        $category = Category::findOrFail($id) ;
        $category->delete($id) ;
        return response()->json(['message' => 'Category deleted successfully']) ;
    }
}
