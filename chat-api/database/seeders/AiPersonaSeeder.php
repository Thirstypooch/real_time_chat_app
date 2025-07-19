<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AiPersonaSeeder extends Seeder
{
    public function run(): void
    {

        $aiPersonas = [
            [
                'name' => 'Bolt - The Mentor',
                'email' => 'bolt@ai.test',
                'avatar' => 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'password' => Hash::make('password'),
                'is_ai' => true,
            ],
            [
                'name' => 'Spark - The Brainstormer',
                'email' => 'spark@ai.test',
                'avatar' => 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'password' => Hash::make('password'),
                'is_ai' => true,
            ],
        ];
        foreach ($aiPersonas as $personaData) {
            User::firstOrCreate(['email' => $personaData['email']], $personaData);
        }
    }
}
