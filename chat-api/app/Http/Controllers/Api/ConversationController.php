<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;

class ConversationController extends Controller
{
    /**
     * Fetch all conversations for the authenticated user.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Eager load relationships to prevent the N+1 query problem.
        // We get the participants and the latest message for each conversation.
        $conversations = $user->conversations()
            ->with(['participants' => function ($query) use ($user) {
                // We don't need to see ourselves in the participants list
                $query->where('users.id', '!=', $user->id);
            }])
            ->with('messages') // temporary, will refine to get only the last message
            ->get();

        return response()->json($conversations);
    }

    /**
     * Fetch all messages for a specific conversation.
     */
    public function messages(Request $request, Conversation $conversation)
    {
        // Basic Authorization Check: Ensure the user is part of the conversation.
        if (! $conversation->participants()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Eager load the sender for each message
        $messages = $conversation->messages()->with('sender')->get();

        return response()->json($messages);
    }
}
