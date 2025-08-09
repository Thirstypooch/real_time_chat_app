<?php

namespace App\Observers;

use App\Models\User;
use App\Services\ConversationService;

class UserObserver
{
    public function created(User $user): void
    {
        resolve(ConversationService::class)-> syncUserConversations($user);
    }
}
