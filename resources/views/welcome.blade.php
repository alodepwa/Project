<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Ve Xe</title>
         <meta name="csrf-token" content="{{ csrf_token() }}">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        
        <!-- font material ui -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <!-- font icon meterial -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <!-- Styles -->
        <link rel="stylesheet" href="{{asset('css/customer.css')}}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">

    </head>
    <body>
        <div id="vexe"></div>
        <div>
            <div class=" Mainfooter mt-5">
                <div class="topFootter">
                    <div class="top-title">
                        <h3 class="pb-3">Vé Xe 2020</h3>
                    </div>
                    <div class="bottom-title">
                        <p>Website được phát triển bởi nhóm sinh viên tại trường đại học Duy Tân.</p>
                        <p>
                            Thông tin thành viên viên nhóm : Trung , Toán, Khanh, Quang, Kim.
									</p>
                        <p>
                            Giảng viên hướng dẫn : Trần Thị Thanh Lan.
									</p>
                    </div>
                </div>
                <div class="bottom row  my-5">
                    <div class="left col-xs-12 col-sm-12 col-md-6 col-lg-6 text-center mb-5">
                        &copy; 2020 All rights Trung, Toan, Khanh, Quang, Kim.
								</div>
                    <div class="right col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <i class="fab fa-twitter"  style= "color: rgba(29,161,242,1.00)" ></i>
                        <i class="fab fa-facebook" style="color: #3f51b5"></i>
                        <i class="fab fa-google-plus-g" style="color: #ffc107"></i>
                        <i class="fab fa-skype" style="color: #007bff"></i>
                        <i class="fab fa-youtube" style="color: #f44336"></i>
                    </div>
                </div>
            </div>
        </div>
        <script src="{{asset('js/app.js')}}"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" ></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <script src="{{asset('/common/jquery.backgroundMove.js')}}"></script>
        <script src="{{asset('js/customer.js')}}"></script>
    </body>
</html>
