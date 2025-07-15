<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $conversations = $user->conversations()
            ->with(['participants' => function ($query) use ($user) {
                $query->where('users.id', '!=', $user->id);
            }])
            ->with('latestMessage')
            ->get();

        return response()->json($conversations);
    }

    public function messages(Request $request, Conversation $conversation)
    {
        if (! $conversation-> participants()-> where('user_id', $request-> user()-> id)-> exists()) {
            return response()-> json(['message' => 'Forbidden'], 403);
        }
        $messages = $conversation->messages()->with('sender')->get();

        return response()->json($messages);
    }
}
