<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    /** @use HasFactory<\Database\Factories\StockMovementFactory> */
    use HasFactory;
    protected $fillable = ['user_id' , 'product_id' , 'type' , 'quantity' , 'reason' , 'note'];

    public function user() {
        return $this->belongsTo(User::class) ;
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }
    
}
