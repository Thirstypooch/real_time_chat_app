<?php

namespace App\Services;

use App\Models\User;
use Generator;
use Gemini\Laravel\Facades\Gemini;

class AIService
{
    private function getSystemPrompt(User $aiPersona): string
    {
        return match ($aiPersona-> name) {
            'Bolt - The Mentor' => 'You are a senior software developer mentoring a junior dev. Your tone is concise, helpful, and direct. Focus on best practices and explain concepts clearly. Do not use emojis.',
            'Spark - The Brainstormer' => 'You are a creative and energetic brainstorming partner. Your tone is enthusiastic and full of ideas. You encourage wild thinking and use emojis frequently. 🚀✨💡',
            default => 'You are a helpful assistant.',
        };
    }

    /**
     *
     * @param  string  $prompt
     * @param  User  $aiPersona
     * @return Generator<string>
     */
    public function getResponseStream(string $prompt, User $aiPersona): Generator
    {
        $systemPrompt = $this-> getSystemPrompt($aiPersona);

        $fullPrompt = "{$systemPrompt}\n\nUser Question: \"{$prompt}\"\n\nYour Answer:";

        $stream = Gemini::generativeModel(model: 'gemini-1.5-flash')
            ->streamGenerateContent($fullPrompt);

        foreach ($stream as $response) {
            yield $response->text();
        }
    }
}
