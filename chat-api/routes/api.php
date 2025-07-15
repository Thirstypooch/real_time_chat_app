<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConversationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MessageController;
use Illuminate\Support\Facades\Broadcast;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Broadcast::routes();
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::get('/conversations/{conversation}/messages', [ConversationController::class, 'messages']);
});
