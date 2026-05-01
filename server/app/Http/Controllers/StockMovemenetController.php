<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockMovemenetController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = StockMovement::select('id', 'product_id', 'type', 'quantity', 'note', 'created_at')
            ->with('product:id,name,quantity');

        if ($request->filled('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        $movements = $query->get();
        return response()->json([
            'success' => true,
            'message' => 'Movements retrieved successfully',
            'data' => $movements
        ]);
    }

    public function stockIn(Request $request)
    {
        $validate = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string'
        ]);

        $movement = DB::transaction(function () use ($validate) {
            $product = Product::findOrFail($validate['product_id']);
            $movement = StockMovement::create([
                'product_id' => $product->id,
                'type' => 'in',
                'quantity' => $validate['quantity'],
                'note' => $validate['note'] ?? null
            ]);
            $product->increment('quantity', $validate['quantity']);
            return $movement;
        });

        return response()->json([
            'success' => true,
            'message' => 'Stock added successfuly',
            'data' => $movement
        ]);
    }

    public function stockOut(Request $request)
    {
        $validate = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string'
        ]);

        $product = Product::findOrFail($validate['product_id']);

        if ($product->quantity < $validate['quantity']) {
            return response()->json([
                'success' => false,
                'message' => 'Not enough stock available'
            ]);
        }

        $movement = DB::transaction(function () use ($validate, $product) {
            $movement = StockMovement::create([
                'product_id' => $product->id,
                'type' => 'out',
                'quantity' => $validate['quantity'],
                'note' => $validate['note'] ?? null
            ]);

            $product->decrement('quantity', $validate['quantity']);
            return $movement;
        });

        return response()->json([
            'success' => true,
            'message' => 'Stock out successffuly',
            'data' => $movement
        ]);
    }
}
