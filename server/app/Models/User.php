<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;

    protected $fillable = ['username', 'firstName', 'lastName', 'email', 'password', 'role'];

    public function movements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
