<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function productsByCategory(Request $request)
    {
        $categories = Category::select('id', 'name')
            ->withCount('products')->oldest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Products by category retrieved successfully',
            'data' => $categories
        ]);
    }

    public function stockStatus()
    {
        $stats = Product::select(
            DB::raw("
                CASE 
                    WHEN quantity = 0 THEN 'out' 
                    WHEN quantity > 0 AND quantity < 10 THEN 'low' 
                    ELSE 'in' 
                END as stock_status 
            "),
            DB::raw("COUNT(*) as total"),
        )->groupBy("stock_status")->pluck('total' , 'stock_status');

        return response()->json([
            'success' => true,
            'data' => [
                'out' => $stats['out'] ?? 0,
                'low' => $stats['low'] ?? 0,
                'in' => $stats['in'] ?? 0,
            ]
        ]);
    }

}
