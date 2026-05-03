<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function stats(Request $request)
    {

        $stats = [];

        $total_products = Product::count();
        $total_categories = Category::count();
        $total_suppliers = Supplier::count();
        $total_products_low_stock = Product::where('quantity', '<', 10)->count();
        $total_products_out_of_stock = Product::where('quantity', '=', 0)->count();

        $stats["total_products"] = $total_products;
        $stats["total_categories"] = $total_categories;
        $stats["total_suppliers"] = $total_suppliers;
        $stats["total_products_low_stock"] = $total_products_low_stock;
        $stats["total_products_out_of_stock"] = $total_products_out_of_stock;

        return response()->json([
            'success' => true,
            'message' => 'Dashboard stats retrieved successfully',
            'data' => $stats
        ]);
    }
}
