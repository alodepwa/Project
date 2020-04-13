<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([],function(){
    Route::resource('home', 'api\HomeController');
    Route::POST('home/get-post', 'api\HomeController@getPost');
    Route::GET('home/get-img-post/{id}', 'api\HomeController@getImagesWithID');
});
