<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected $fillable = ['category_id', 'supplier_id', 'name', 'description', 'price', 'quantity'];

    public function category() {
        return $this->belongsTo(Category::class) ;
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class) ;
    }

    public function movements() {
        return $this->hasMany(StockMovement::class) ;
    }
}
