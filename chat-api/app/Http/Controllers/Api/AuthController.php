<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user-> password)) {
            return response()->json(['email' => 'Invalid credentials'], 401);
        }

        $token = $user-> createToken('auth-token')-> plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request-> user()-> currentAccessToken()-> delete();

        return response()-> json(['message' => 'Successfully logged out']);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    public function googleRedirect(): RedirectResponse
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    /**
     * Obtain the user information from Google.
     */
    public function googleCallback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Find or create the user
            $user = User::updateOrCreate([
                'google_id' => $googleUser->id,
            ], [
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'avatar' => $googleUser->avatar,
                'password' => null, // No password for OAuth users
            ]);

            // Create a Sanctum token for the user
            $token = $user->createToken('auth-token')->plainTextToken;

            // Prepare user data for the frontend
            $userJson = urlencode(json_encode($user));

            // Redirect back to the React frontend callback page with the token and user data
            return redirect(config('app.frontend_url', 'http://localhost:5173') . "/auth/callback?token={$token}&user={$userJson}");

        } catch (\Exception $e) {
            // If something goes wrong, redirect to the login page with an error
            return redirect(config('app.frontend_url', 'http://localhost:5173') . '/login?error=google_auth_failed');
        }
    }
}
