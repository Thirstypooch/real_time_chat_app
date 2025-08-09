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

        $this-> call([
            AiPersonaSeeder:: class,
            InitialUserSeeder:: class,
        ]);

        $conversationService = resolve(ConversationService:: class);
        $humanUsers = User:: where('is_ai', false)-> get();

        foreach ($humanUsers as $user) {
            $conversationService-> syncUserConversations($user);
        }

    }
}
