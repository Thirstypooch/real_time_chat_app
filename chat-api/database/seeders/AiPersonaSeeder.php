<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        // Find the main human user we created in DatabaseSeeder
        $humanUser = User::where('email', 'test@example.com')->first();

        if (! $humanUser) {
            $this->command->warn('Main test user not found. Skipping AI conversation seeding.');
            return;
        }

        $aiPersonas = [
            [
                'name' => 'Bolt - The Mentor',
                'email' => 'bolt@ai.test',
                'avatar' => '/avatars/bolt.png',
                'password' => Hash::make('password'),
                'is_ai' => true, // We'll add this column later if needed
            ],
            [
                'name' => 'Spark - The Brainstormer',
                'email' => 'spark@ai.test',
                'avatar' => '/avatars/spark.png',
                'password' => Hash::make('password'),
                'is_ai' => true,
            ],
        ];

        foreach ($aiPersonas as $personaData) {
            // Create the AI user
            $aiUser = User::create($personaData);

            // Create a new conversation between the human and the AI
            $conversation = Conversation::create();

            // Attach both users to the conversation
            $conversation->participants()->attach([$humanUser->id, $aiUser->id]);
        }
    }
}
