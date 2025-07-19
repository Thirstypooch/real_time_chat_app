<?php

namespace App\Observers;

use App\Models\Conversation;
use App\Models\User;

class UserObserver
{
    /**
     * @param  User  $user
     *  @return void
 */
    public function created(User $user): void
    {
        if ($user-> is_ai) {
            return;
        }

        $aiPersonas = User::where('is_ai', true)->get();
        foreach ($aiPersonas as $ai) {
            $conversation = Conversation::create();
            $conversation->participants()->attach([$user->id, $ai->id]);
        }

        $otherUsers = User::where('is_ai', false)->where('id', '!=', $user->id)->get();
        foreach ($otherUsers as $otherUser) {
            $conversation = Conversation::create();
            $conversation->participants()->attach([$user->id, $otherUser->id]);
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
