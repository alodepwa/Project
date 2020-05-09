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
    Route::GET('home', 'api\HomeController@index');
    Route::POST('home/get-post', 'api\HomeController@getPost');
    Route::GET('home/get-img-post/{id}', 'api\HomeController@getImagesWithID');
    Route::GET('home/get-seat-car/{id}', 'api\HomeController@getInfoSeatCar');
    Route::POST('home/register-ticket', 'api\HomeController@registerTicket');
    Route::GET('home/get-name-cars','api\HomeController@getCarsName');
    Route::POST('home/search-ticket-user', 'api\HomeController@searchTicketUser');
    Route::POST('home/comment', 'api\HomeController@comment');
    Route::GET('home/get-comment/{id}', 'api\HomeController@getComments');
});

Route::group(['prefix' => 'admin'], function(){
    Route::POST('login', 'api\AdminController@Login');
    Route::GET('get-role', 'api\AdminController@getRole');
    Route::POST('create-user','api\AdminController@createUser');
    Route::GET('get-list-user/{id}', 'api\AdminController@getListUsers');
    Route::POST('update-user', 'api\AdminController@updateUser');
    Route::DELETE('delete-user/{id}', 'api\AdminController@deleteUser');
    Route::GET('get-category-car','api\AdminController@getCategory');
    Route::POST('create-car','api\AdminController@createCar');
    Route::GET('get-list-car/{id}', 'api\AdminController@getListCar');
    Route::POST('update-car','api\AdminController@updateCar');
    Route::POST('delete-car', 'api\AdminController@deleteCar');
    Route::POST('create-trip-passenger-car','api\AdminController@createTripPassengerCar');
    Route::GET('get-list-trips-passenger-car/{id}', 'api\AdminController@getListTripPassengerCar');
    Route::POST('update-trips-passenger-car', 'api\AdminController@updatetripPassengerCar');
    Route::GET('get-list-car-post/{id}', 'api\AdminController@getListCarPost');
    Route::POST('create-post', 'api\AdminController@createPost');
    Route::POST('get-list-post','api\AdminController@getListPost');
    Route::POST('update-post', 'api\AdminController@updatePost');
    Route::DELETE('delete-post/{id}', 'api\AdminController@deletePost');
    Route::GET('approve-post/{id}', 'api\AdminController@approvePost');
    Route::GET('get-myprofile/{id}', 'api\AdminController@getMyProfile');
    Route::POST('update-profile', 'api\AdminController@updateMyProfile');
    Route::GET('get-ticket-by-car/{id}','api\AdminController@getTicketByCar');
});