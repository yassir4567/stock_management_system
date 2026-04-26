<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Supplier::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        $suppliers = $query->get();
        return response()->json(['data' => $suppliers], 200);
    }

    public function options()
    {
        $suppliers = Supplier::select('id', 'name')->get();
        return response()->json(['data' => $suppliers], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'phone' => 'required|string',
            'address' => 'required|string'
        ]);

        $supplier = Supplier::create($validated);

        $supplier = Supplier::select('id', 'name', 'email', 'phone', 'address', 'created_at')->find($supplier->id);
        return response()->json([
            'message' => "supplier created successfully",
            'data' => $supplier
        ]);
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
