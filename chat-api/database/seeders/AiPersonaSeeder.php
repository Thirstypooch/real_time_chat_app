<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Conversation;
use App\Models\User;

class AiPersonaSeeder extends Seeder
{
    public function run(): void
    {
        $humanUsers = User::where('is_ai', false)->get();

        if ($humanUsers->isEmpty()) {
            $this->command->warn('No human users found. Skipping AI conversation seeding.');
            return;
        }

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
            $aiUser = User::create($personaData);
            foreach ($humanUsers as $humanUser) {
                $conversation = Conversation::create();
                $conversation->participants()->attach([$humanUser->id, $aiUser->id]);
            }
        }
    }
}
