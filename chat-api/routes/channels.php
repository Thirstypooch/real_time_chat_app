<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast:: channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user-> id ===  (int) $id;
});

Broadcast:: pressenceChannel('conversation.{conversationId}', function ($user, $conversationId) {
    if ($user-> conversations()-> where('conversations.id', (int) $conversationId)-> exists()) {
        return ['id' => $user-> id, 'name' => $user-> name];
    }
    return false;
});
