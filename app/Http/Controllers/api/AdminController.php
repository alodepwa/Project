<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class AdminController extends Controller
{
    function Login(Request $request){
        $phone = $request->get('phone');
        $password = $request->get('password');
        $login = DB::select('exec loginAdmin ?, ?', [$phone, $password ]);
        return response()->json($login);
    }
    
    function getRole(){
        $get_role = DB::select('select * from Roles');
        return response()->json($get_role);
    }

    function createUser(Request $request){
        $data = [
            $request->get('name'),
            $request->get('phone'),
            $request->get('address'),
            $request->get('dateOffBirth'),
            (int)$request->get('sex'),
            (int)$request->get('role'),
            (int)$request->get('id'),
            $request->get('password')
        ];
        $create_user = DB::select('exec createUser ?, ?, ?, ?, ?, ?, ?, ?', $data);
        return response()->json($create_user);
    }

    function getListUsers($id){
        $list_users = DB::select('exec getListUsers ?',[$id]);
        return response()->json($list_users);
    }

    function updateUser(Request $request){
        $data = [
            $request->get('name'),
            $request->get('phone'),
            $request->get('address'),
            $request->get('dateOffBirth'),
            (int)$request->get('sex'),
            (int)$request->get('role'),
            (int)$request->get('id')
        ];
        $update_user = DB::select('exec updateUser ?, ?, ?, ?, ?, ?, ?', $data);
        return response()->json($update_user);
    }

    function deleteUser($id){
        $delete_user = DB::select('exec deleteUser ?', [(int)$id]);
        return response()->json($delete_user);
    }

    function getCategory(){
        $category_car = DB::select('select * from Category');
        return response()->json($category_car);
    }

    function createCar(Request $request){
        $data = [
            $request->get('carnumber'),
            $request->get('name'),
            $request->get('phone'),
            $request->get('fare'),
            $request->get('seat'),
            $request->get('admin_id'),
            $request->get('category_car'),
            $request->get('created_by'),
            $request->get('from'),
            $request->get('to'),
        ];
        $create_car = DB::select('exec createCar ?, ?, ?, ?, ?, ?, ?, ?, ?, ?', $data);
        return response()->json($create_car);
    }

    function getListCar($id){
        $list_car = DB::select('exec getListCar ?', [(int)$id]);
        return response()->json($list_car);
    }

    function updateCar(Request $request){
        $data = [
            $request->get('id_car'),
            $request->get('id_trip'),
            $request->get('Car_Number'),
            $request->get('Passenger_Car_Name'),
            $request->get('phone'),
            $request->get('Passenger_Car_fare'),
            $request->get('Passenger_Car_Seats'),
            $request->get('admin_id'),
            $request->get('category_car'),
            $request->get('name_admin'),
            $request->get('Trips_Start'),
            $request->get('Trips_Ends'),
        ];
        $update_car = DB::select('exec updateCar ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?', $data);
        return response()->json($update_car);
    }

    function deleteCar(Request $request){
        $data = [
            $request->get('id'),
            $request->get('user_deleted')
        ];
        $delete_car = DB::select('exec deleteCar ?, ?', $data);
        return response()->json($delete_car);
    }

    function createTripPassengerCar(Request $request){
        $data = [
            $request->get('id_car'),
            $request->get('id_trip'),
            $request->get('date'),
            $request->get('timeStart'),
            $request->get('timeEnd'),
            
        ];
        $createTripPassenger = DB::select('exec createTripPassengerCar ?, ?, ?, ?, ?', $data);
        return response()->json($createTripPassenger);
    }
    function getListTripPassengerCar($id){
        $getListTripPassenger = DB::select('exec getListTripPassengerCar ?', [ $id ]);
        return response()->json($getListTripPassenger);
    }
}
