<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class HomeController extends Controller
{
    /**
     * insert data into table car_ticket (register seat car)
     *
     * @return \Illuminate\Http\Response
     */
    public function registerTicket(Request $request){
        $id     = $request->get('id');
        $name   = $request->get('name');
        $phone  = $request->get('phone');
        $from   = $request->get('from');
        $to     = $request->get('to');
        $address= $request->get('address');
        $seats  = $request->get('seats');
        $result = [];
        for( $i = 0; $i < count($seats) ; $i++){
            $data = [ $from, $to, $address, $seats[$i], $phone, (INTEGER)$id, $name];
            $register = DB::select('exec registerTicket ?, ?, ?, ?, ?, ?, ?', $data);
            isset($register[0]->result) ? ($result[$seats[$i]] = false) : ($result[$seats[$i]] = $register);
        }
        return response()->json($result);
    }

    /**
     * Display a listing of the images with id post.
     *
     * @return \Illuminate\Http\Response
     */
    public function getImagesWithID($id){
        $result = DB::select('exec getImagesWithID ?', [$id]);
        return response()->json($result);
    }

     /**
     * Display a listing of the images with id post.
     *
     * @return \Illuminate\Http\Response
     */
    public function getInfoSeatCar($id){
        $result = DB::select('exec getInfoSeatCar ?', [$id]);
        return response()->json($result);
    }


    /**
     * Display a listing of the posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPost(Request $request){
        $data = [
            $request->get('fromLocation'),
            $request->get('toLocation'),
            $request->get('dateSearch'),
        ];
        $result = DB::select('exec getPost ?, ?, ?', $data);
        return response()->json($result);
    }
     /**
     * Display a listing of the resource.
     *
     *
     */
    public function getCarsName()
    {
        $getCarNames = DB::select('exec getNameCars');
        return response()->json($getCarNames);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $start  = DB::select('select distinct Trips_Start from Trips');
        $end    = DB::select('select distinct Trips_Ends from Trips');
        return response()->json(['start' => $start, 'end' => $end]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function searchTicketUser(Request $request)
    {
        $data   = [
            $request->get('phone'),
            $request->get('name') ? $request->get('name')  : '' ,
        ];
        $search = DB::select('exec ticketsOffUser ?, ?', $data);
        return response()->json($search);
    }

    /**
     * comment ticket by user .
     *
     * @return \Illuminate\Http\Response
     */
    public function comment(Request $request)
    {
        $data   = [
            $request->get('comment_name'),
            $request->get('comment_content'),
            $request->get('comment_phone'),
            $request->get('comment_rate'),
            $request->get('post_id')
        ];
        $comment = DB::select('exec comment ?, ?, ?, ?, ?', $data);
        $check = $comment[0]->id_insert ? true : false;
        return response()->json($check);
    }

    /**
     * get comment ticket with post_id .
     *
     * @return \Illuminate\Http\Response
     */
    public function getComments($post_id)
    {
        
        $get_comment = DB::select('exec getComments ?',[$post_id]);
        return response()->json($get_comment);
    }
    
    
}
