<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = collect([
            User::factory()-> create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'avatar' => 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ]),
            User::factory()-> create([
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'avatar' => 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ]),
            User::factory()-> create([
                'name' => 'Richard Roe',
                'email' => 'richard@example.com',
                'avatar' => 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ]),
        ]);


        for ($i = 0; $i < $users-> count(); $i++) {
            for ($j = $i + 1; $j < $users-> count(); $j++) {
                $conversation = Conversation::create();
                $conversation-> participants()-> attach([$users[$i]-> id, $users[$j]-> id]);
            }
        }

        $this-> call([
            AiPersonaSeeder::class,
        ]);
    }
}
