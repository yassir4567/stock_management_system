<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StockMovementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $products = Product::all();

        foreach ($products as $product) {
            $currentStock = $product->quantity;

            StockMovement::factory()->create([
                'product_id' => $product->id,
                'type' => 'in',
                'quantity' => $currentStock,
                'created_at' => now()->subDay(fake()->numberBetween(30, 70)),
            ]);

            $movementCount = fake()->numberBetween(1, 4);

            for ($i = 0; $i <= $movementCount; $i++) {
                $type = fake()->randomElement(['in', 'out']);
                if ($type === 'in') {
                    $quantity = fake()->numberBetween(5, 35);

                    StockMovement::factory()->create([
                        'type' => 'in',
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'created_at' => now()->subDays(fake()->numberBetween(1, 29)),
                    ]);

                    $currentStock += $quantity;
                    
                } else if ($type === 'out') {
                    if ($currentStock <= 0) {
                        continue;
                    }
                    $quantity = fake()->numberBetween(1, min(20, $currentStock));

                    StockMovement::factory()->create([
                        'type' => 'out',
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'created_at' => now()->subDays(fake()->numberBetween(1, 29)),
                    ]);

                    $currentStock -= $quantity;
                }
            }
            $product->update([
                'quantity' => $currentStock
            ]);
        }
    }
}
