<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\users;
use App\Http\Controllers\ChatAIController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::match(['GET','POST'],'createNewTrip' ,[SearchController::class,'createNewTripSearch']);
Route::get('getTripDetails/{id}' ,[SearchController::class,'getTripById']);
Route::post('getAllTrips' ,[SearchController::class,'getAllTrips']);
Route::post('createUser' ,[users::class,'createUser']);
Route::post('getUser' ,[users::class,'getUser']);
Route::post('chatAI' ,[ChatAIController::class,'chatAI']);


