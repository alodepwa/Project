import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import * as common from './../../common';
import Rating from '@material-ui/lab/Rating';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const useStyles =(theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 500,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});
class LayoutMangerTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false,
            name: '',
            phone: '',
            isChecked: false,
            dataSearch: [],
            errName: '',
            errPhone: '',
            date: moment(new Date()).format('YYYY-MM-DD'),
            comment_rate: 1,
            comment_content: '',
            comment_name: '',
            comment_phone: '',
            err_cm_name: '',
            err_cm_phone: '',
            err_cm_content: '',
            post_id: '',
            columns: [
                { title: 'Tên Khách Hàng', field: 'Car_Ticket_Name_User' },
                { title: 'SĐT', field: 'Car_Ticket_Phone' },
                { title: 'Ngày ĐVé', field: 'created_at' },
                { title: 'Ngày Đi', field: 'Trips_Passenger_Car_Date' },
                { title: 'Giá Vé', field: 'Passenger_Car_fare' },
                { title: 'Ghế', field: 'Seats_Position' },
                { title: 'Điểm Đi', field: 'Trips_Start' },
                { title: 'Điểm Đến', field: 'Trips_Ends' },
                { title: 'Chú Thích', field: 'Car_Ticket_Note' },
                { title: 'Tên Xe', field: 'Passenger_Car_Name' },
                { title: 'Biển Số', field: 'Car_Number' },
                { title: 'Thời Gian Đi', field: 'Trips_Passenger_Car_Time_Start' },
            ],
            data: []
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onClickSaveComment = this.onClickSaveComment.bind(this);
        this.onClickCloseModal = this.onClickCloseModal.bind(this);
        this.onClickExitModal  = this.onClickExitModal.bind(this);
        this.onClickButtonDelete    = this.onClickButtonDelete.bind(this);
    }
    onClickExitModal(e){
        e.preventDefault();
        this.setState({
            modal : false
        })
    }

    onClickCloseModal(e) {
        e.preventDefault();
        this.setState({
            comment_rate: 1,
            comment_content: '',
            comment_name: '',
            comment_phone: '',
            err_cm_name: '',
            err_cm_phone: '',
            err_cm_content: '',
            post_id: ''
        });
    }

    onClickSaveComment(e) {
        e.preventDefault();
        let { comment_name, comment_phone, comment_rate, comment_content, post_id } = this.state;
        let data = { comment_name, comment_content, comment_phone, comment_rate, post_id };
        axios.post(`${common.HOST}home/comment`, data)
            .then(res => {
                this.setState({
                    modal : false,
                    comment_content: '',
                    comment_name: '',
                    comment_phone: '',
                })
                res.data == true ? (Swal.fire({
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
            .catch(err => { throw err; })
    }

    onChangeRate(event, value) {
        event.preventDefault();
        this.setState({
            comment_rate: value
        })
    }

    onChangeInput(e) {
        e.preventDefault();
        let { value } = e.target;
        let parrtenNumber = /^0[1-9][0-9]{7,9}$/;
        let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><0-9]*$/;
        let parrtenComment = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><]*$/;
        switch (e.target.name) {
            case 'comment_name': {
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
            case 'comment_phone': {
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
            case 'comment_content': {
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
            case 'name': {
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
            case 'phone': {
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

    onClickComment(e, data) {
        e.preventDefault();
        this.setState({
            post_id: data.Passenger_Car_Id,
            modal : true
        });
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

    onClickButtonDelete(event, data){
        event.preventDefault();
        console.log(data.phone);
        Swal.fire({
            title: `Chức năng này chưa được sử dụng. Vui lòng liên hệ ${data.phone} để được hủy vé!`,
            icon: 'warning',
        })
    }

    render() {
        const { classes } = this.props;
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
                                        <MaterialTable
                                            title={"Danh sách vé bạn đã đặt"}
                                            columns={this.state.columns}
                                            data={this.state.dataSearch}
                                            actions={[
                                                rowData => ((moment(rowData.Trips_Passenger_Car_Date).format('YYYY-MM-DD') < this.state.date) ? {
                                                    icon: 'comment',
                                                    tooltip: 'Comment',
                                                    onClick: (event, rowData) => {
                                                        this.onClickComment(event, rowData)
                                                    }
                                                } : null),
                                                rowData => ((moment(rowData.Trips_Passenger_Car_Date).format('YYYY-MM-DD') > this.state.date) ? {
                                                    icon: 'delete',
                                                    tooltip: 'Delete Ticket',
                                                    onClick: (event, rowData) => {
                                                        this.onClickButtonDelete(event, rowData)
                                                    }
                                                } : null),
                                            ]}
                                        />
                                    )
                                }
                                <div className="card-footer">
                                    <h6 className="text-center">Thông tin danh sách vé <strong>{this.state.phone}</strong></h6>
                                </div>

                                <div className={ this.state.data.length > 0 ?  classes.root : '' }>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={this.state.modal}
                                        onClose={this.onClickExitModal}
                                        closeAfterTransition
                                        className={classes.modal}
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={this.state.modal}>
                                            <div className={classes.paper}>
                                                <h4 id="transition-modal-title">Add Comment</h4>
                                                <div className="row">
                                                    <div className="col-12 ">
                                                    <form>
                                                            <div className="form-group">
                                                                <label >Tên <span style={{ color: 'red' }}>*</span> &nbsp;&nbsp;&nbsp;
                                                                <span style={{ color: 'red' }}>{this.state.err_cm_name}</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="comment_name"
                                                                    className="form-control" aria-describedby="emailHelp"
                                                                    placeholder="Tên của bạn..."
                                                                    onBlur={(e) => this.onChangeInput(e)}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label >Số điện thoại <span style={{ color: 'red' }}>*</span>
                                                                    <span style={{ color: 'red' }}>{this.state.err_cm_phone}</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="comment_phone"
                                                                    className="form-control"
                                                                    placeholder="Số điện thoại của bạn..."
                                                                    onChange={(e) => this.onChangeInput(e)}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label >Độ hài lòng <span style={{ color: 'red' }}>*</span> </label>
                                                                <div className="rate">
                                                                    <Rating
                                                                        name="comment_rate"
                                                                        value={this.state.comment_rate}
                                                                        onChange={this.onChangeRate}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label >Đánh giá <span style={{ color: 'red' }}>*</span>
                                                                    <span style={{ color: 'red' }}>{this.state.err_cm_content}</span>
                                                                </label>
                                                                <textarea
                                                                    type="text"
                                                                    name="comment_content"
                                                                    className="form-control"
                                                                    placeholder="Đánh giá của bạn..."
                                                                    onBlur={(e) => this.onChangeInput(e)}
                                                                />
                                                            </div>
                                                        </form>
                                                        <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            disabled={
                                                                !this.state.err_cm_content && !this.state.err_cm_phone
                                                                    && !this.state.err_cm_name && this.state.comment_name
                                                                    && this.state.comment_content && this.state.comment_rate
                                                                    && this.state.comment_phone ? false : true
                                                            }
                                                            onClick={(e) => this.onClickSaveComment(e)}
                                                        >
                                                            Lưu đánhh giá
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={(e) => this.onClickExitModal(e)}
                                                        >
                                                            Exit
                                                        </button>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(LayoutMangerTicket);
