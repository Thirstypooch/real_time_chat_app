<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function store(Request $request, Conversation $conversation): JsonResponse
    {
        // 1. Authorize: Check if the authenticated user is a participant
        if (! $conversation->participants()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // 2. Validate: Check if the message content is present
        $validator = Validator::make($request->all(), [
            'content' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 3. Create the message
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $request->user()->id,
            'content' => $request->input('content'),
        ]);

        // 4. Return the new message with the sender info
        $message->load('sender');

        return response()->json($message, 201);
    }
}
