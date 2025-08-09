<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ConversationService
{
    /**
     * Ensure a user has conversations with all AI personas and other human users.
     *
     * @param  User  $userToSync
     */
    public function syncUserConversations(User $userToSync): void
    {
        if ($userToSync-> is_ai) {
            return;
        }

        $allOtherUsers = User:: where('id', '!=', $userToSync-> id)-> get();

        foreach ($allOtherUsers as $otherUser) {
            $conversationExists = DB::table('conversation_user as cu1')
                ->join('conversation_user as cu2', 'cu1.conversation_id', '=', 'cu2.conversation_id')
                ->where('cu1.user_id', $userToSync->id)
                ->where('cu2.user_id', $otherUser->id)
                ->exists();

            if (!$conversationExists) {
                $conversation = Conversation::create();
                $conversation->participants()->attach([$userToSync->id, $otherUser->id]);
            }
        }
    }
}
