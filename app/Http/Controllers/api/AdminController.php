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
}
