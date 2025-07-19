<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application Services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application Services.
     */
    public function boot(): void
    {
        User::observe(UserObserver::class);
        RateLimiter::for('daily', function (Request $request) {
            return Limit::perDay(50)->by($request->user()->id);
        });
    }
}
