<?php

namespace App\Http\Controllers;

use App\Models\StockMovement;
use Illuminate\Http\Request;

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
}
