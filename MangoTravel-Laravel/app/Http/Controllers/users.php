<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class users extends Controller
{
    public function getUser(Request $request){
        $user = User::where('device_id', $request->device_id)->first();
        if($user){
            return response()->json(['data' => $user,'status'=> true], 200);

        }else{
            return response()->json(['data' => null,'status'=> false],404);

        }
    }
    public function createUser(Request $request){

        $validator = Validator::make($request->all(), [
            'device_id' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:100'],
            'phone' => ['required', ],
            'email' => ['required'],
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()], 422);
        }else{
            $user = User::where('email',$request->input('email'))->first();
            if($user == null)
                $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->phone = $request->input('phone');
            $user->device_id = $request->input('device_id');
            $user->save();
            return response()->json(['data' => $user,'message'=> 'User Updated!']);
        }

    }
}
