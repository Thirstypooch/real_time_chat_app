<?php

namespace Database\Seeders;

use App\Models\User;
use App\Services\ConversationService;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

            User::factory()-> create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'avatar' => 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ]);
            User::factory()-> create([
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'avatar' => 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ]);
            User::factory()-> create([
                'name' => 'Richard Roe',
                'email' => 'richard@example.com',
                'avatar' => 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ]);

        $this-> call([
            AiPersonaSeeder::class,
        ]);

        $humanUsers = User::where('is_ai', false)->get();
        $conversationService = resolve(ConversationService::class);

        foreach ($humanUsers as $user) {
            $conversationService->syncUserConversations($user);
        }
    }
}
