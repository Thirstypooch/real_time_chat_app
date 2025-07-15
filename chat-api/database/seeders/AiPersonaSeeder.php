<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Conversation;
use App\Models\User;

class AiPersonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $humanUser = User::where('email', 'test@example.com')->first();

        if (! $humanUser) {
            $this->command->warn('Main test user not found. Skipping AI conversation seeding.');
            return;
        }

        $aiPersonas = [
            [
                'name' => 'Bolt - The Mentor',
                'email' => 'bolt@ai.test',
                // Using Michael Brown's avatar
                'avatar' => 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'password' => Hash::make('password'),
                'is_ai' => true,
            ],
            [
                'name' => 'Spark - The Brainstormer',
                'email' => 'spark@ai.test',
                // Using Emma Davis's avatar
                'avatar' => 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'password' => Hash::make('password'),
                'is_ai' => true,
            ],
        ];

        foreach ($aiPersonas as $personaData) {
            $aiUser = User::create($personaData);
            $conversation = Conversation::create();
            $conversation->participants()->attach([$humanUser->id, $aiUser->id]);
        }
    }
}
