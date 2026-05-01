<?php

namespace App\Http\Controllers;

use App\Models\StockMovement;
use Illuminate\Http\Request;

class StockMovemenetController extends Controller
{
    //
    public function index(Request $request)
    {
        $movements = StockMovement::select('id', 'product_id', 'type', 'quantity', 'note', 'created_at')
            ->with('product:id,name,quantity')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Movements retrieved successfully',
            'data' => $movements
        ]);
    }
}
