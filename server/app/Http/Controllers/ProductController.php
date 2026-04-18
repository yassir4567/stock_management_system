<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::select('id' , 'category_id' , 'supplier_id' , 'name' , 'price' , 'quantity' , 'description')
        ->with(['category:id,name', 'supplier:id,name'])->get();

        return response()->json(['data' => $products]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        $product = Product::create($validated) ;

        $product = Product::select('id' , 'category_id' , 'supplier_id' , 'name' , 'price' , 'quantity' , 'description')
        ->with(['category:id,name', 'supplier:id,name'])->find($product->id) ;

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ]);
    }

    public function show($id) {}

    public function update(Request $request, $id) {

        $product = Product::findOrFail($id) ;
        
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]) ;

        $product->update($validated) ;

        $product = Product::select('id' , 'category_id' , 'supplier_id' , 'name' , 'price' , 'quantity' , 'description')
        ->with(['category:id,name' , 'supplier:id,name'])->find($product->id) ;

        return response()->json(['message' => "Product updated successfully" ,'data' => $product]) ;
    }

    public function delete($id) {
        $product = Product::findOrFail($id) ;
        $product->delete($id) ;

        return response()->json(['message' => "Product deleted successfully"]) ;
    }
}
