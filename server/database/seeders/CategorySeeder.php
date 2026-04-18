<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories = [
            [
                'name' => 'Electronics',
                'description' => 'Devices and electronic equipment such as computers, printers, and accessories used in daily operations.',
            ],
            [
                'name' => 'Office Supplies',
                'description' => 'Basic office materials like paper, pens, notebooks, and other stationery used for administrative work.',
            ],
            [
                'name' => 'Furniture',
                'description' => 'Office furniture including desks, chairs, cabinets, and other equipment used to organize workspace.',
            ],
            [
                'name' => 'Cleaning Products',
                'description' => 'Products used for cleaning and maintenance such as detergents, disinfectants, and cleaning tools.',
            ],
        ];
        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'description' => $category['description'],
            ]);
        }
    }
}
