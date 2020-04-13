import React, { Component } from 'react';
import * as common from './../../common';
import axios from 'axios';

class LayoutInfoTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts   : [],
            images  : []
        }
        this.onClickBtnInfo = this.onClickBtnInfo.bind(this);
    }
   
    componentWillReceiveProps(props) {
        if (props.posts)
            this.setState({ posts: props.posts });
    }

    onClickBtnInfo(e,value){
        e.preventDefault();
        axios.get(`${common.HOST}home/get-img-post/${value}`)
        .then( res => {
           if(res.data)
            this.setState({
                images : res.data
            })
        })
        .catch(err => { throw err; });
        console.log(value);
       
    }
    

    render() {
        return (
            <div>
                {
                    this.state.posts.length > 0 ? this.state.posts.map( (value, key) => {
                        return (
                            <div className="container mb-4 " key = { key }>
                                <div className="card hover-content">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-12">
                                                <img className="image" src="images/xe_khach_1_1.jpg" alt={value.Name_Image} height="170px" width="100%" />
                                            </div>
                                            <div className="col-lg-5 col-12">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="d-flex flex-column ">
                                                            <div className="d-flex">
                                                                <strong>{ value.Passenger_Car_Name }</strong>
                                                                <span><i className="far fa-star" />4.0</span>
                                                                <li className="text-muted">32 đánh giá</li>
                                                            </div>
                                                                <p><small>Giường nằm { value.Passenger_Car_Seats }chỗ</small></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 ">
                                                        <div className="time">
                                                            <div>
                                                                <p>
                                                                    <i className="far fa-dot-circle" />
                                                                    <strong>{ value.Trips_Passenger_Car_Time_Start }</strong>
                                                                    <span data-toggle="tooltip" data-placement="top" title="Nam Tran-Thanh Tinh">{ value.Trips_Start }</span>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p data-toggle="tooltip" data-placement="top" title="Strips time about"><small>9h15m</small></p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <i className="fas fa-map-marker-alt" />
                                                                    <strong>{ value.Trips_Passenger_Car_Time_End }</strong>
                                                                    <span data-toggle="tooltip" data-placement="top" title="Tran Nhan Tong Street, Ninh Phuc Ward">{ value.Trips_Ends }</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-12">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="d-flex justify-content-start">
                                                            <h3><strong>{ value.Passenger_Car_fare }đ</strong></h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="d-flex flex-column">
                                                            <div className="d-flex justify-content-start">
                                                                <p><small>26 chổ trống</small></p>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <button onClick = { (e) => this.onClickBtnInfo(e, value.Post_Id) } data-id = { value.Post_Id } className="btn btn-primary btn_info">
                                                                    Thông tin chi tiết
                                                                </button>
                                                                <div className="btn btn-success btn_book">
                                                                    Đặt Vé
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* toggler */}
                                        <div className="col_btn_info">
                                            <div className="border border-left-0 border-right-0 border-bottom-0">
                                                <nav className="nav nav-tabs justify-content-around">
                                                    <a className="nav-link active" href="#" data-toggle="tab" data-target="#imagesId">Hình ảnh</a>
                                                    <a className="nav-link" href="#" data-toggle="tab" data-target="#map">Điểm đón trả</a>
                                                    <a className="nav-link" href="#" data-toggle="tab" data-target="#danhgia">Đánh giá</a>
                                                    <a className="nav-link" href="#danhgia" data-toggle="tab" data-target="#info">Thông tin khác</a>
                                                </nav>
                                                <div className="tab-content mt-3">
                                                    <div className="container tab-pane active" id="imagesId">
                                                        <img src="images/xe_khach_1_1.jpg" alt="" />
                                                    </div>
                                                    <div className="container tab-pane" id="map">
                                                        <p><strong>Lưu ý</strong></p>
                                                        <p>Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.
                                                            Lịch này có thể thay đổi tùy tình hình thưc tế.</p>
                                                        <div className="d-flex justify-content-between">
                                                            <p> { value.Trips_Start } </p>
                                                            <p> { value.Trips_Ends } </p>
                                                        </div>
                                                    </div>
                                                    <div className="container tab-pane" id="danhgia">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="d-flex justify-content-start">
                                                                    <p><span><i className="far fa-star" />4.0</span></p>
                                                                    <div className="mx-3 color">
                                                                        <span><i className="far fa-star" /></span>
                                                                        <span><i className="far fa-star" /></span>
                                                                        <span><i className="far fa-star" /></span>
                                                                        <span><i className="far fa-star" /></span>
                                                                        <span><i className="far fa-star" /></span>
                                                                    </div>
                                                                    <p /><li>32 đánh giá</li><p />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="row">
                                                                    <div className="col-lg-4">
                                                                        <div className="d-flex flex-column">
                                                                            <div>
                                                                                <p>chất lượng xe</p>
                                                                            </div>
                                                                            <div className="progress" style={{ height: '10px' }}>
                                                                                <span className="progress-bar" style={{ width: '50%' }}>70%</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="d-flex flex-column">
                                                                            <div>
                                                                                <p>Đúng giờ</p>
                                                                            </div>
                                                                            <div className="progress" style={{ height: '10px' }}>
                                                                                <span className="progress-bar" style={{ width: '50%' }}>70%</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="d-flex flex-column">
                                                                            <div>
                                                                                <p>Thái độ phục vụ</p>
                                                                            </div>
                                                                            <div className="progress" style={{ height: '10px' }}>
                                                                                <span className="progress-bar" style={{ width: '50%' }}>70%</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                {/*content comment  */}
                                                                <div className="mt-3 border border-bottom-0 border-right-0 border-left-0">
                                                                    <div className="row mt-3">
                                                                        <div className="col-lg-4">
                                                                            <div className="d-flex flex-column text-center">
                                                                                <div className="d-flex justify-content-center">
                                                                                    <span className="fas fa-user-alt display-3" />
                                                                                </div>
                                                                                <p>Nam</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-8">
                                                                            <div className="d-flex flex-column">
                                                                                <div className="d-flex flex-column">
                                                                                    <div className="color">
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                    </div>
                                                                                    <p className="text-muted">Nhận xét vào 27/09/2018</p>
                                                                                </div>
                                                                                <div>
                                                                                    <p>
                                                                                        Đi xe Kim Chi khá ổn, xe có nhiều chuyến trong ngày. Mình thường đi chuyến tối, ăn uống nghỉ ngơi xong mình lên xe ngủ 1 giấc là về nhà.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3 border border-bottom-0 border-right-0 border-left-0">
                                                                    <div className="row mt-3">
                                                                        <div className="col-lg-4">
                                                                            <div className="d-flex flex-column text-center">
                                                                                <div className="d-flex justify-content-center">
                                                                                    <span className="fas fa-user-alt display-3" />
                                                                                </div>
                                                                                <p>Nam</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-8">
                                                                            <div className="d-flex flex-column">
                                                                                <div className="d-flex flex-column">
                                                                                    <div className="color">
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                        <span><i className="far fa-star" /></span>
                                                                                    </div>
                                                                                    <p className="text-muted">Nhận xét vào 27/09/2018</p>
                                                                                </div>
                                                                                <div>
                                                                                    <p>
                                                                                        Đi xe Kim Chi khá ổn, xe có nhiều chuyến trong ngày. Mình thường đi chuyến tối, ăn uống nghỉ ngơi xong mình lên xe ngủ 1 giấc là về nhà.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* end content comment */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="container tab-pane" id="info">
                                                        <p>Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.
                                            Lịch này có thể thay đổi tùy tình hình thưc tế.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*  */}
                                    </div>
                                </div>
                            </div>
                        );
                    }) :  ( <div style={{ textAlign : "center" }}> {common.NOT_EXISTS_POST} </div> )
                }
               
            </div>
        )
    }
}

export default LayoutInfoTicket
