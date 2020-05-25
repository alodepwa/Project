import React, { Component } from 'react';
import * as common from './../../common';
import axios from 'axios';
import Swal from 'sweetalert2';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import NumberFormat from 'react-number-format';
import Chip from '@material-ui/core/Chip';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import moment from 'moment';
function format_money(money, seat) {
    let format = money.replace(/,/g, '');
    let total = seat * format;
    // let parse =  new Intl.NumberFormat.format(total);
    return total;
}

class LayoutInfoTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            images: [],
            seats: [],
            step1: [],
            comments: [],
            nameStep2: '',
            phoneStep2: '',
            addressStep2: '',
            fromStep2: '',
            toStep2: '',
            phoneErr: '',
            addressErr: '',
            nameErr: '',
            toErr: '',
            fromErr: ''
        }
        this.onClickBtnInfo = this.onClickBtnInfo.bind(this);
        this.onClickBtnRegTicket = this.onClickBtnRegTicket.bind(this);
        this.regiterPosition = this.regiterPosition.bind(this);
        this.onChangeInputAddress = this.onChangeInputAddress.bind(this);
        this.onChangeInputName = this.onChangeInputName.bind(this);
        this.onChangeInputPhone = this.onChangeInputPhone.bind(this);
        this.onChangeInputTo = this.onChangeInputTo.bind(this);
        this.onChangeInputFrom = this.onChangeInputFrom.bind(this);
        this.onClickSubStep2 = this.onClickSubStep2.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }
    // seat int seat number when click remove
    handleDelete(event, seat) {
        event.preventDefault();
        var { step1 } = this.state;
        let check = step1.indexOf(seat);
        if (check !== -1)
            step1.splice(check, 1);
        this.setState({
            step1
        });
    }
    onClickComment(e, value) {
        e.preventDefault();
        axios.get(`${common.HOST}home/get-comment/${value}`)
            .then(res => {
                this.setState({
                    comments: res.data
                });
            })
            .catch(err => { throw err });

    }

    onClickSubStep2(e, id) {
        e.preventDefault();
        let data = {
            'id': id,
            'name': this.state.nameStep2,
            'phone': this.state.phoneStep2,
            'from': this.state.fromStep2,
            'to': this.state.toStep2,
            'address': this.state.addressStep2,
            'seats': this.state.step1,
        };
        axios.post(`${common.HOST}home/register-ticket`, data)
            .then(res => {
                let data = [];
                let seatErr = '';
                let seats = [];
                Object.entries(res.data).forEach(element => {
                    element[1] == false ? (seatErr += ` ${element[0]} `) : (data = element[1]);
                });
                data.forEach(element => {
                    seats[element.Seats_Position] = element.Car_Status
                })
                setTimeout(() => {
                    this.setState({
                        seats
                    });
                    !seatErr ?
                        Swal.fire({
                            icon: 'success',
                            text: 'Bạn đã đặt vé thành công!',
                            timer: 2000
                        })
                        :
                        Swal.fire({
                            icon: 'error',
                            text: `Ghế ${seatErr} không thể đặt vé.`,
                            timer: 2000
                        });
                }, 100);
            })
            .catch(err => { throw err; })
    }

    onChangeInputTo(e) {
        e.preventDefault();
        let { value } = e.target;
        let partten = /^[^!@#$%^&*()_+~`|\\\?.><,;:'"]*$/;
        if (partten.test(value)) {
            this.setState({
                toStep2: value,
                toErr: ''
            })
        } else {
            this.setState({
                toErr: 'Nơi đến không nên dùng kí tự đặt biệt!',
                toStep2: ''
            })
        }

    }

    onChangeInputFrom(e) {
        e.preventDefault();
        let { value } = e.target;
        let partten = /^[^!@#$%^&*()_+~`|\\\?.><,;:'"]*$/;
        if (partten.test(value)) {
            this.setState({
                fromStep2: value,
                fromErr: ''
            })
        } else {
            this.setState({
                fromErr: 'Nơi đón không nên dùng kí tự đặt biệt!',
                fromStep2: ''
            })
        }
    }

    onChangeInputName(e) {
        e.preventDefault();
        let { value } = e.target;
        let partten = /^[^!@#$%^&*()_+~`|\\\?.><,;:'"0-9]*$/;
        if (partten.test(value)) {
            this.setState({
                nameStep2: value,
                nameErr: ''
            })
        } else {
            this.setState({
                nameErr: 'Tên không nên dùng kí tự đặt biệt hoặc số!',
                nameStep2: ''
            })
        }

    }
    onChangeInputPhone(e) {
        e.preventDefault();
        let { value } = e.target;
        let partten = /^0[1-9][0-9]{7,9}$/;
        if (partten.test(value))
            this.setState({
                phoneStep2: value,
                phoneErr: ''
            })
        else
            this.setState({
                phoneErr: 'số điện thoại bắt đầu bằng 0 và không chứa kí tự đặc biệt!',
                phoneStep2: ''
            })
    }

    onChangeInputAddress(e) {
        e.preventDefault();
        this.setState({
            addressStep2: e.target.value
        })
    }

    regiterPosition(floor, seat, statusSeat) {
        let { step1 } = this.state;
        var ClickStep1 = (e, valueSeat) => {
            e.preventDefault();
            let a = e.target;
            let check = step1.indexOf(valueSeat);
            if (check == -1)
                step1.push(valueSeat);
            else
                step1.splice(check, 1);

            this.setState({
                step1
            });
        }
        function CheckSeat(value1, value2) {
            let layout = [];
            for (let i = value1; i <= value2; i++) {
                if (statusSeat[i] == '1')
                    layout.push(
                        <div key={i} className="iconBus iconChecked btn" ><i className="fas fa-bus" /></div>
                    );
                else
                    if (step1.indexOf(i) === -1) {
                        layout.push(
                            <div title={` Ghế số ${i} `} data-id={i} key={i} className="iconBus iconEmpty btn" onClick={(e) => ClickStep1(e, i)}><i className="fas fa-bus" /></div>
                        );
                    } else {
                        layout.push(
                            <div title={` Ghế số ${i} `} data-id={i} key={i} className="iconBus iconCheck btn" onClick={(e) => ClickStep1(e, i)}><i className="fas fa-bus" /></div>
                        );
                    }

            }
            return layout;
        }

        const LayoutIconBus = (props) => {
            let layout;
            if (props.number == 1) {
                layout = CheckSeat(1, parseInt(seat));
            } else if (props.number == 2) {
                layout = CheckSeat(1, parseInt(seat) / 2);
            } else {
                layout = CheckSeat(parseInt(seat) / 2 + 1, parseInt(seat));
            }
            return layout;
        }

        return (
            <div>
                {
                    floor == 1 ? (
                        <div className="d-flex flex-column" >
                            <p className="flex-fill text-center"><strong >Tầng 1</strong></p>
                            <div className="g-icon-bus">
                                <LayoutIconBus number={1} />
                            </div>
                        </div>
                    )
                        :
                        (
                            <div>
                                <div className="d-flex flex-column" >
                                    <p className="flex-fill text-center"><strong >Tầng 1</strong></p>
                                    <div className="g-icon-bus">
                                        <LayoutIconBus number={2} />
                                    </div>
                                </div>
                                <div className="d-flex flex-column" >
                                    <p className="flex-fill text-center"><strong >Tầng 2</strong></p>
                                    <div className="g-icon-bus">
                                        <LayoutIconBus number={3} />
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }

    componentWillReceiveProps(props) {
        if (props.posts)
            this.setState({ posts: props.posts });
    }

    onClickBtnRegTicket(e, value) {
        e.preventDefault();
        axios.get(`${common.HOST}home/get-seat-car/${value}`)
            .then(res => {
                if (res.data) {
                    let seats = [];
                    res.data.forEach(element => {
                        seats[element.Seats_Position] = element.Car_Status
                    });
                    this.setState({
                        seats,
                        step1: []
                    });
                }

            })
            .catch(err => { throw err; });
        this.setState({
            nameStep2: '',
            phoneStep2: '',
            addressStep2: ''
        });
    }
    onClickBtnInfo(e, value) {
        e.preventDefault();
        axios.get(`${common.HOST}home/get-img-post/${value}`)
            .then(res => {
                if (res.data)
                    this.setState({
                        images: res.data
                    })
            })
            .catch(err => { throw err; });
    }
    render() {
        return (
            <div>
                {
                    this.state.posts.length > 0 ? this.state.posts.map((value, key) => {
                        return (
                            <div className="container mb-4 " key={key}>
                                <div className="card hover-content">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                <img className="image" src={ value.Path_Image ?  value.Path_Image : `https://sc02.alicdn.com/kf/HTB1JnQraJfvK1RjSspfq6zzXFXaz/prices-yutong-bus-new-electric-bus-king.jpg` } alt={value.Name_Image} height="170px" width="100%" />
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-5">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="d-flex flex-column ">
                                                            <div className="d-flex">
                                                                <strong className="formatOverText" title={value.Passenger_Car_Name}>{value.Passenger_Car_Name}</strong>
                                                                {/* <span><i className="far fa-star" />4.0</span>
                                                                <li  className="text-muted">32 đánh giá</li> */}
                                                            </div>
                                                            <p><small>Giường nằm {value.Passenger_Car_Seats} chỗ</small></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 ">
                                                        <div className="time">
                                                            <div>
                                                                <p>
                                                                    <i className="far fa-dot-circle" />
                                                                    <strong>&nbsp;{value.Trips_Passenger_Car_Time_Start}</strong>
                                                                    <span data-toggle="tooltip" data-placement="top" title="Nam Tran-Thanh Tinh">&nbsp;--- &nbsp;{value.Trips_Start}</span>
                                                                </p>
                                                            </div>
                                                            <div>
                                                            <p data-toggle="tooltip" data-placement="top" title="Strips time about"><small>--------------------</small></p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <i className="fas fa-map-marker-alt" />
                                                                    <strong>&nbsp;{value.Trips_Passenger_Car_Time_End}</strong>
                                                                    <span data-toggle="tooltip" data-placement="top" title="Tran Nhan Tong Street, Ninh Phuc Ward"> &nbsp;--- &nbsp;{value.Trips_Ends}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
                                                <div className="row d-flex" style={{ height: '100%' }}>
                                                    <div className="col-lg-12">
                                                        <div className="d-flex justify-content-start">
                                                            <p><u>Giá Vé </u>: <strong>{value.Passenger_Car_fare}&nbsp;đ</strong></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="d-flex justify-content-start">
                                                            <p><u>Ngày Đi</u> : <strong>{value.Trips_Passenger_Car_Date}</strong></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="d-flex flex-column">
                                                            <div className="d-flex justify-content-start">
                                                                <p><small></small></p>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <button onClick={(e) => this.onClickBtnInfo(e, value.Post_Id)} className="btn btn-primary btn_info mr-1">
                                                                    Thông tin chi tiết
                                                                </button>
                                                                <button className="btn btn-success btn_register_ticket"
                                                                    disabled = {
                                                                        value.Trips_Passenger_Car_Date == moment(new Date()).format('YYYY-MM-DD') && moment(value.Trips_Passenger_Car_Time_Start).format('h:mm:ss A') > moment(new Date()).format('h:mm:ss A') ? true : false
                                                                    }
                                                                    onClick={(e) => { this.onClickBtnRegTicket(e, value.Trips_Passenger_Car_Id) }}
                                                                >
                                                                    Đặt Vé
                                                                </button>
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
                                                    <a className="nav-link active" href="#" data-toggle="tab" data-target={`#imagesId${key}`}>Hình ảnh</a>
                                                    <a className="nav-link" href="#" data-toggle="tab" data-target={`#map${key}`}>Điểm đón trả</a>
                                                    <a className="nav-link" href="#" data-toggle="tab" data-target={`#danhgia${key}`} onClick={e => this.onClickComment(e, value.Post_Id)} >Đánh giá</a>
                                                    <a className="nav-link" href="#" data-toggle="tab" data-target={`#info${key}`}>Thông tin bài post</a>
                                                    <div className="btn btn-danger text-center closeToggle"><i className="far fa-times-circle" style={{ paddingTop: '6px' }} ></i></div>
                                                </nav>
                                                <div className="tab-content mt-3">
                                                    <div className="container tab-pane bodyImage active" id={`imagesId${key}`}>
                                                        {
                                                            this.state.images.map((data,key) => {
                                                              return ( <img className="imagePost" key={key} src={data.Path_Image} alt={data.Name_Image} />)
                                                            })
                                                        }
                                                        
                                                    </div>
                                                    <div className="container tab-pane" id={`map${key}`}>
                                                        <p><strong>Lưu ý</strong></p>
                                                        <p>Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.
                                                            Lịch này có thể thay đổi tùy tình hình thưc tế.</p>
                                                        <div className="d-flex justify-content-between">
                                                            <p> {value.Trips_Start} </p>
                                                            <p> {value.Trips_Ends} </p>
                                                        </div>
                                                    </div>
                                                    <div className="container tab-pane" id={`danhgia${key}`}>
                                                        {
                                                            this.state.comments.map((value, key) => {
                                                                return (
                                                                    <div key={key} className="mt-3 border border-bottom-0 border-right-0 border-left-0">
                                                                        <div className="row mt-3">
                                                                            <div className="col-lg-4">
                                                                                <div className="d-flex flex-column text-center" style={{ alignItems: 'center' }}>
                                                                                    <div>
                                                                                        <Avatar src="" />
                                                                                    </div>
                                                                                    <p className="mt-1">{value.name_user}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-8">
                                                                                <div className="d-flex flex-column">
                                                                                    <div className="d-flex flex-column">
                                                                                        <div className="color">
                                                                                            <Rating
                                                                                                name="comment_rate"
                                                                                                value={parseInt(value.Comment_Number_of_Stars)}
                                                                                                readOnly
                                                                                            />
                                                                                        </div>
                                                                                        <p className="text-muted">{value.created_at}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p>
                                                                                            {value.Comment_Content}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    <div className="container tab-pane" id={`info${key}`}>
                                                        <div className="row">
                                                            <p><strong>Tiêu đề : </strong> &nbsp;</p>
                                                            <p>{value.Post_Title}</p>
                                                        </div>
                                                        <div className="row">
                                                            <p><strong>Nội dung : </strong> &nbsp;</p>
                                                            <p>{value.Post_Content}</p>
                                                        </div>
                                                        <div className="row">
                                                            <p><strong>Chú ý : </strong> &nbsp;</p>
                                                            <p>{value.Post_note}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col_btn_register">
                                            <div className="bg-light">
                                                <div className="border border-left-0 border-right-0 border-bottom-0">
                                                    <div className="mt-3">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="d-flex justify-content-between">
                                                                        <div className="number d-flex">
                                                                            <p className="stepActive pr-1" style={{ background: '#007bff' }}>1</p>
                                                                            <p>Chọn Chỗ</p>
                                                                        </div>
                                                                        <div className="number d-flex">
                                                                            <p className="stepActive">2</p>
                                                                            <p>Nhập thông tin</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col-lg-4">
                                                                                <p><strong>Chú thích</strong></p>
                                                                                <p><i className="fas fa-bus" style={{ color: 'rgba(244, 67, 54, 0.9)' }} />&nbsp; Đang đặt </p>
                                                                                <p><i className="fas fa-bus " style={{ color: 'black' }} />&nbsp; Đã đặt</p>
                                                                                <p><i className="fas fa-bus " style={{ color: 'blue' }} />&nbsp; Chưa đặt</p>
                                                                            </div>
                                                                            <div className="col-lg-8">
                                                                                <div className="d-flex justify-content-around">
                                                                                    {
                                                                                        value.Category_Id == 1 ? this.regiterPosition(1, value.Passenger_Car_Seats, this.state.seats) : this.regiterPosition(2, value.Passenger_Car_Seats, this.state.seats)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="border border-bottom-0 border-left-0 border-right-0 ">
                                                                        <div className="d-flex justify-content-between mt-3">
                                                                            <div className="d-flex align-items-center">
                                                                                <div>Ghế  :  &nbsp;
                                                                                    {
                                                                                        this.state.step1.length > 0 ? this.state.step1.map((index, key) =>

                                                                                            <Chip
                                                                                                key={key}
                                                                                                icon={<DirectionsCarIcon />}
                                                                                                label={index}
                                                                                                onDelete={(e) => this.handleDelete(e, index)}
                                                                                                color="primary"
                                                                                            />
                                                                                        ) : ''
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex">
                                                                                <p className="p-1 mr-2">Tổng cộng: <strong>
                                                                                    {this.state.step1.length > 0 ?
                                                                                        <NumberFormat
                                                                                            value={format_money(value.Passenger_Car_fare, this.state.step1.length)}
                                                                                            displayType={'text'} thousandSeparator={true}
                                                                                        />
                                                                                        : 0}&nbsp;đ</strong></p>
                                                                                <button
                                                                                    disabled={this.state.step1.length > 0 ? false : true}
                                                                                    style={{ cursor: this.state.step1.length > 0 ? '' : 'no-drop' }} className="btn submit-step1 btn-primary" >Tiếp tục</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col_input_info">
                                            <div className="bg-light ">
                                                <div className="border border-left-0 border-right-0 border-bottom-0">
                                                    <div className="mt-3">
                                                        <div className="container tab-pane active" id="seatsposition">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="d-flex justify-content-between">
                                                                        <div className="number d-flex">
                                                                            <p className="stepActive" >1</p>
                                                                            <p>Chọn Chỗ</p>
                                                                        </div>
                                                                        <div className="number d-flex">
                                                                            <p className="stepActive pr-1" style={{ background: '#007bff' }}>2</p>
                                                                            <p>Nhập thông tin</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="row">
                                                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center">
                                                                            <strong>From</strong> : {value.Trips_Start}
                                                                            &nbsp;
                                                                        <strong>To</strong> : {value.Trips_Ends}
                                                                        </div>
                                                                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-center">
                                                                            {
                                                                                this.state.step1.map(value =>
                                                                                    (
                                                                                        <Chip
                                                                                            icon={<DirectionsCarIcon />}
                                                                                            key={value}
                                                                                            label={value}
                                                                                            clickable
                                                                                            color="primary"
                                                                                            onDelete={(e) => this.handleDelete(e, value)}

                                                                                        />
                                                                                    )
                                                                                )
                                                                            }
                                                                        </div>
                                                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                                                                            <strong>Giá</strong> : {this.state.step1.length > 0 ?
                                                                                <NumberFormat
                                                                                    value={format_money(value.Passenger_Car_fare, this.state.step1.length)}
                                                                                    displayType={'text'} thousandSeparator={true}
                                                                                />
                                                                                : 0} &nbsp;đ
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="container">
                                                                        <div className="d-flex flex-column">
                                                                            <div className="form-group">

                                                                                <div className="row">
                                                                                    <label>Họ tên <span style={{ color: 'red' }}> * </span></label>
                                                                                    <label style={{ color: 'red' }}>&nbsp;&nbsp;{this.state.nameErr ? this.state.nameErr : ''}</label>
                                                                                </div>
                                                                                <input type="text"
                                                                                    required className="form-control name" onBlur={
                                                                                        (e) => this.onChangeInputName(e)
                                                                                    }></input>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <label>Số điện thoại <span style={{ color: 'red' }}> * </span></label>
                                                                                    <label style={{ color: 'red' }}>&nbsp;&nbsp;{this.state.phoneErr ? this.state.phoneErr : ''}</label>
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <input type="number" step={0}
                                                                                        required
                                                                                        className="form-control phone" onChange={
                                                                                            (e) => this.onChangeInputPhone(e)
                                                                                        }
                                                                                    ></input>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <label>Nơi đón khách <span style={{ color: 'red' }}> * </span></label>
                                                                                    <label style={{ color: 'red' }}>&nbsp;&nbsp;{this.state.fromErr ? this.state.fromErr : ''}</label>
                                                                                </div>
                                                                                <input type="text"
                                                                                    onBlur={
                                                                                        (e) => this.onChangeInputFrom(e)
                                                                                    }
                                                                                    required className="form-control from"
                                                                                ></input>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <label>Nơi trả khách <span style={{ color: 'red' }}> * </span></label>
                                                                                    <label style={{ color: 'red' }}>&nbsp;&nbsp;{this.state.toErr ? this.state.toErr : ''}</label>
                                                                                </div>
                                                                                <input type="text"
                                                                                    onBlur={
                                                                                        (e) => this.onChangeInputTo(e)
                                                                                    }
                                                                                    required className="form-control to"
                                                                                ></input>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <label>Ghi chú </label>
                                                                                    <label style={{ color: 'red' }}>&nbsp;&nbsp;{this.state.addressErr ? this.state.addressErr : ''}</label>
                                                                                </div>
                                                                                <textarea type="text"
                                                                                    required className="form-control note"
                                                                                    onBlur={
                                                                                        (e) => this.onChangeInputAddress(e)
                                                                                    }
                                                                                ></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="d-flex justify-content-between my-3">
                                                                        <button className="btn btn-success btn-rollback ">
                                                                            Quay lại
                                                                        </button>
                                                                        <button
                                                                            className="btn-primary submit-step2 p-1"
                                                                            disabled={
                                                                                this.state.nameStep2 && this.state.phoneStep2 && this.state.fromStep2 && this.state.toStep2 && this.state.step1.length > 0 ? false : true
                                                                            }
                                                                            style={{
                                                                                cursor:
                                                                                    this.state.nameStep2 && this.state.phoneStep2 && this.state.fromStep2 && this.state.toStep2 && this.state.step1.length > 0 ? '' : 'no-drop'
                                                                            }}
                                                                            onClick={(e) => this.onClickSubStep2(e, value.Trips_Passenger_Car_Id)}>
                                                                            Tiếp tục
                                                                            </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*  */}
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (<div style={{ textAlign: "center" }}> {common.NOT_EXISTS_POST} </div>)
                }
            </div>
        )
    }
}
export default LayoutInfoTicket
