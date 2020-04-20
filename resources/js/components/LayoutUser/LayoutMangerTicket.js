import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import * as common from './../../common';
import Rating from '@material-ui/lab/Rating';
import Swal from 'sweetalert2';
class LayoutMangerTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name                : '',
            phone               : '',
            isChecked           : false,
            dataSearch          : [],
            errName             : '',
            errPhone            : '',
            date                : moment(new Date()).format('YYYY-MM-DD'),
            comment_rate        : 1,
            comment_content     : '',
            comment_name        : '',
            comment_phone       : '',
            err_cm_name         : '',
            err_cm_phone        : '',
            err_cm_content      : '',
            post_id             : ''

        }
        this.onChangeInput          = this.onChangeInput.bind(this);
        this.onChangeCheckBox       = this.onChangeCheckBox.bind(this);
        this.onClickSearch          = this.onClickSearch.bind(this);
        this.onClickComment         = this.onClickComment.bind(this);
        this.onChangeRate           = this.onChangeRate.bind(this);
        this.onClickSaveComment     = this.onClickSaveComment.bind(this);
        this.onClickCloseModal      = this.onClickCloseModal.bind(this);
    }

    onClickCloseModal(e){
        e.preventDefault();
        this.setState({
            comment_rate        : 1,
            comment_content     : '',
            comment_name        : '',
            comment_phone       : '',
            err_cm_name         : '',
            err_cm_phone        : '',
            err_cm_content      : '',
            post_id             : ''
        });
    }

    onClickSaveComment(e){
        e.preventDefault();
        let { comment_name, comment_phone, comment_rate, comment_content, post_id } = this.state;
        let data = { comment_name, comment_content, comment_phone, comment_rate, post_id };
        axios.post(`${common.HOST}home/comment`, data)
        .then( res => {
            console.log(res.data)
            res.data ? (Swal.fire({
                icon: 'success',
                text: `Bạn đã đánh giá thành công!`,
                timer: 2000
            })) : (Swal.fire({
                icon: 'error',
                text: `Bạn đã đánh giá không thành công thành công!`,
                timer: 2000
            }));
            $()
        })
        .catch( err => { throw err; })
    }

    onChangeRate(event, value){
        event.preventDefault();
        this.setState({
            comment_rate : value
        })
    }

    onChangeInput(e){
        e.preventDefault();
        let { value }           = e.target;
        let parrtenNumber       = /^0[1-9][0-9]{7,9}$/;
        let parrtenText         = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><0-9]*$/;
        let parrtenComment      = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><]*$/;
        switch(e.target.name){
            case 'comment_name' : {
                let err_cm_name = 'Tên không chứa kí tự đặt biệt hoặc số!';
                if (parrtenText.test(value)) {
                    this.setState({
                        [e.target.name]: value,
                        err_cm_name: ''
    
                    });
                } else {
                    this.setState({
                        err_cm_name,
                        [e.target.name]: '',
                    });
                }
                break;
                break;
            }
            case 'comment_phone' : {
                let err_cm_phone = 'SĐT không đúng định dạng!'
                if (parrtenNumber.test(value)) {
                    this.setState({
                        [e.target.name]: value,
                        err_cm_phone: ''
                    });
                } else {
                    this.setState({
                        err_cm_phone,
                        [e.target.name]: '',
                    });
                }
                break;
                break;
            }
            case 'comment_content' : {
                let err_cm_content = 'Nội dung đánh giá không chứa kí tự đặt biệt hoặc số!';
                if (parrtenComment.test(value)) {
                    this.setState({
                        [e.target.name]: value,
                        err_cm_content: ''
    
                    });
                } else {
                    this.setState({
                        err_cm_content,
                        [e.target.name]: '',
                    });
                }
                break;
            }
            case 'name' : {
                let errName = 'Tên không chứa kí tự đặt biệt hoặc số!';
                if (parrtenText.test(value)) {
                    this.setState({
                        [e.target.name]: value,
                        errName: ''
    
                    });
                } else {
                    this.setState({
                        errName,
                        [e.target.name]: '',
                    });
                }
                break;
            }
            case 'phone' : {
                let errPhone = 'SĐT không đúng định dạng!'
                if (parrtenNumber.test(value)) {
                    this.setState({
                        [e.target.name]: value,
                        errPhone: ''
                    });
                } else {
                    this.setState({
                        errPhone: errPhone,
                        [e.target.name]: '',
                    });
                }
                break;
            }
            
        }
    }

    onClickComment(e, car_id) {
        e.preventDefault();
        this.setState({
            post_id : car_id
        })
    }

    onChangeCheckBox(e) {
        // e.preventDefault();
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    onClickSearch(e) {
        e.preventDefault();
        let { name, phone } = this.state;
        let data = { phone, name };

        axios.post(`${common.HOST}home/search-ticket-user`, data)
            .then(res => {
                this.setState({
                    dataSearch: res.data
                })
            })
            .catch(err => {
                throw err;
            })
    }


    render() {
        return (
            <div>
                <div className="">
                    <div className="row mt-4">
                        <div className="col-lg-3 col-md-12">
                            <div className="container border rounded py-4">
                                <h4> NHẬP THÔNG TIN VÉ</h4>
                                <div className="form-group">
                                    <label style={{ color: 'red' }}>* &nbsp;&nbsp; {this.state.errPhone}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Số điện thoại"
                                        name="phone"
                                        onBlur={(e) => this.onChangeInput(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ color: 'red' }}>{this.state.errName}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        // value = {this.state.name} 
                                        className="form-control"
                                        placeholder="Tên Khách Hàng"
                                        onBlur={(e) => this.onChangeInput(e)}
                                    />
                                </div>

                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="isChecked"
                                            checked={this.state.isChecked}
                                            onChange={(e) => this.onChangeCheckBox(e)}
                                        />
                                        Tôi không phải người máy
                                    </label>
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary form-control"
                                        onClick={(e) => this.onClickSearch(e)}
                                        disabled={this.state.isChecked && !this.state.errPhone && !this.state.errName && this.state.phone ? false : true}
                                        style={{ cursor: this.state.isChecked && !this.state.errPhone && !this.state.errName && this.state.phone ? '' : 'no-drop' }}
                                    >Kiểm tra vé</button>
                                </div>
                                <h5>Lưu ý:</h5>
                                <a> Trường hợp bạn không thể hủy vé qua mạng hoặc muốn đổi sang vé khác vui lòng liên hệ qua số điện thoại 1900 7070.</a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="card border-0">
                                {this.state.dataSearch.length == 0 ? (<div className="alert alert-success" role="alert">
                                    <h6 className="alert-heading text-center">Vui lòng nhập thông tin và bấm kiểm tra vé</h6>
                                    <p className="mb-0" />
                                </div>) :
                                    (
                                        <div className="card-body">
                                            <table id="dtHorizontalVerticalExample" className="table table-striped table-bordered table-responsive table-sm " cellSpacing={0} width="100%">
                                                <thead>
                                                    <tr id="thead-table" className="text-muted">
                                                        <th >Mã vé</th>
                                                        <th >Tên khách hàng</th>
                                                        <th>Số điện thoại</th>
                                                        <th>Ngày đặt vé</th>
                                                        <th>Ngày đi</th>
                                                        <th>Giá vé</th>
                                                        <th>Ghế</th>
                                                        <th>Điểm đi</th>
                                                        <th>Điểm đến</th>
                                                        <th>Chú thích</th>
                                                        <th>Tên xe</th>
                                                        <th>Biển số xe</th>
                                                        <th>Thời gian đi</th>
                                                        <th>Thời gian đến</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.dataSearch.map((value, key) => {
                                                            return (<tr key={key} >
                                                                <td>{value.Car_Ticket_Id}</td>
                                                                <td>{value.Car_Ticket_Name_User}</td>
                                                                <td>{value.Car_Ticket_Phone}</td>
                                                                <td>{value.created_at}</td>
                                                                <td>{value.Trips_Passenger_Car_Date}</td>
                                                                <td>{value.Passenger_Car_fare}</td>
                                                                <td>{value.Seats_Position}</td>
                                                                <td>{value.Car_Ticket_Start_Point}</td>
                                                                <td>{value.Car_Ticket_End_Point}</td>
                                                                <td>{value.Car_Ticket_Note}</td>
                                                                <td>{value.Passenger_Car_Name}</td>
                                                                <td>{value.Passenger_Car_Id}</td>
                                                                <td>{value.Trips_Passenger_Car_Time_End}</td>
                                                                <td>{value.Trips_Passenger_Car_Time_Start}</td>
                                                                <td>
                                                                    {
                                                                        (moment(value.Trips_Passenger_Car_Date).format('YYYY-MM-DD') < this.state.date) ? (
                                                                            // <div
                                                                            //     className="btn btn-warning"
                                                                            //     >
                                                                            //     comment
                                                                            // </div>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                                                                onClick={(e) => this.onClickComment(e, value.Passenger_Car_Id)}
                                                                            >
                                                                                Đánh giá xe
                                                                            </button>
                                                                        ) : ''
                                                                    }

                                                                </td>
                                                            </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }
                                <div className="card-footer">
                                    <h6 className="text-center">Thông tin danh sách vé <strong>{this.state.phone}</strong></h6>
                                </div>

                                <div>
                                    <div>
                                        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Đánh Giá Xe</h5>
                                                        <button 
                                                            type="button" 
                                                            className="close" 
                                                            data-dismiss="modal" 
                                                            aria-label="Close"
                                                            onClick = { e => this.onClickCloseModal(e)}
                                                            >
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <div className="form-group">
                                                                <label >Tên <span style={{color:'red'}}>*</span> &nbsp;&nbsp;&nbsp; 
                                                                <span style={{color:'red'}}>{this.state.err_cm_name}</span>
                                                                </label>
                                                                <input 
                                                                    type="text" 
                                                                    name="comment_name" 
                                                                    className="form-control" aria-describedby="emailHelp" 
                                                                    placeholder="Tên của bạn..." 
                                                                    onBlur = { (e) => this.onChangeInput(e) }
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label >Số điện thoại <span style={{color:'red'}}>*</span> 
                                                                <span style={{color:'red'}}>{this.state.err_cm_phone}</span>
                                                                </label>
                                                                <input 
                                                                    type="number" 
                                                                    name="comment_phone"  
                                                                    className="form-control" 
                                                                    placeholder="Số điện thoại của bạn..." 
                                                                    onBlur = { (e) => this.onChangeInput(e) }
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label >Độ hài lòng <span style={{color:'red'}}>*</span> </label>
                                                                <div className="rate">
                                                                    <Rating
                                                                        name="comment_rate" 
                                                                        value={ this.state.comment_rate }
                                                                        onChange = { this.onChangeRate }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label >Đánh giá <span style={{color:'red'}}>*</span> 
                                                                <span style={{color:'red'}}>{this.state.err_cm_content}</span>
                                                                </label>
                                                                <textarea 
                                                                    type="text" 
                                                                    name="comment_content" 
                                                                    className="form-control" 
                                                                    placeholder="Đánh giá của bạn..." 
                                                                    onBlur = { (e) => this.onChangeInput(e) }
                                                                />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-primary"
                                                            disabled = { 
                                                                !this.state.err_cm_content && !this.state.err_cm_phone
                                                                && !this.state.err_cm_name && this.state.comment_name
                                                                && this.state.comment_content && this.state.comment_rate
                                                                && this.state.comment_phone ? false : true 
                                                            }
                                                            onClick = { (e) => this.onClickSaveComment(e) }
                                                        >
                                                        Lưu đánhh giá
                                                        </button>
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
            </div>
        )
    }
}
export default LayoutMangerTicket;
