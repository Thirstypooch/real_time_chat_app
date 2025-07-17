<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Events\AIResponseChunkSent;
use App\Services\AIService;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function store(Request $request, Conversation $conversation, AIService $aiService): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'content' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 1. Save and broadcast the user's message
        $userMessage = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $request->user()->id,
            'content' => $request->input('content'),
        ]);
        $userMessage->load('sender');
        MessageSent::dispatch($userMessage);

        $recipient = $conversation->participants()->where('user_id', '!=', $request->user()->id)->first();

        if ($recipient) {
            // Increment unread count for the recipient
            $conversation->participants()->updateExistingPivot($recipient->id, [
                'unread_count' => DB::raw('unread_count + 1'),
            ]);
        }

        // 2. If the recipient is an AI, get a streamed response
        if ($recipient instanceof User && $recipient-> is_ai) {
            $fullResponse = '';
            $isFirstChunk = true;

            // 3. Stream the response, broadcasting each chunk
            $stream = $aiService-> getResponseStream($request->input('content'), $recipient);
            foreach ($stream as $chunk) {
                $fullResponse .= $chunk;
                // This event drives the live "typing" effect on the frontend
                AIResponseChunkSent::dispatch($conversation->id, $chunk, $isFirstChunk, $recipient);
                $isFirstChunk = false;
            }

            // 4. Once streaming is complete, save and broadcast the final message
            if (!empty($fullResponse)) {
                $aiMessage = Message::create([
                    'conversation_id' => $conversation->id,
                    'sender_id' => $recipient->id,
                    'content' => $fullResponse,
                ]);
                $aiMessage->load('sender');
                // This event replaces the temporary streaming message with the final one
                MessageSent::dispatch($aiMessage);
            }
        }

        return response()->json($userMessage, 201);
    }
}
