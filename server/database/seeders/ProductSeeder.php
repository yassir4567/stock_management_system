<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categoryIds = Category::pluck('id');

        foreach ($categoryIds as $categoryId) {
            $count = rand(1, 3);

            Product::factory()->count($count)->create([
                'category_id' => $categoryId,
            ]);
        }
    }
}
