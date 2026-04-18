<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::all() ;
        return response()->json(['data' => $categories] , 200) ;
    }

    public function options() {
        $categories = Category::select('id' , 'name')->get() ;
        return response()->json(['data' => $categories]) ;
    }

    public function store(Request $request)
    {
        //
    }


    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
