<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class ChatAIController extends Controller
{
    public function chatAI(Request $request){
        $result = OpenAI::completions()->create([
            'model' => 'text-davinci-003',

            'prompt' => $request->message ,
            'max_tokens' => 1500,
        ]);
        return response()->json(['message'=>$result['choices'][0]['text']]);
    }
}
