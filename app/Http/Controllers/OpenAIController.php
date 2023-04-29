<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OpenAIController extends Controller
{
    public function proxyCall(Request $request)
    {
        $apiUrl = 'https://api.openai.com/v1/chat/completions';
        $apiKey = env('GPT_API_KEY');

        $headers = [
            'Authorization' => "Bearer {$apiKey}",
            'Content-Type' => 'application/json',
        ];

        $body = $request->getContent();

        $response = Http::withHeaders($headers)->post($apiUrl, json_decode($body, true));

        return response()->json($response->json());
    }
}
