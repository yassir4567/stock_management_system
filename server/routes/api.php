<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // * Products Routes
    Route::get("/products", [ProductController::class, 'index']);
    Route::post("/products", [ProductController::class, 'store']);
    Route::put("/products/{id}", [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'delete']);

    // * Categories routes 
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/options', [CategoryController::class, 'options']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'delete']);

    // * Suppliers Routes
    Route::get('/suppliers', [SupplierController::class, 'index']);
    Route::get('/suppliers/options', [SupplierController::class, 'options']);
    Route::post('/suppliers', [SupplierController::class, 'store']);
});
