import React, { useEffect, useState, useCallback } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import * as common from './../../common';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import * as CommonAlert from './../Common/ShowAlert';
import Swal from 'sweetalert2';
import DateFnsUtils from '@date-io/date-fns';
import NumberFormat from 'react-number-format';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
const useStyles = makeStyles((theme) => ({
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
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function LayoutListTrips() {
    const classes = useStyles();
    const [idLogin, setIdLogin] = useState('');
    const [isClickInfo, setIsClickInfo] = useState(false);
    const [isClickShow, setIsClickShow] = useState(false);
    const [dataInfo, setDataInfo] = useState({
        data: [],
        Car_Number: '',
        Passenger_Car_Name: '',
        Trips_Start: ''
    });
    const [dataShow, setDataShow] = useState([]);
    const [preUpdate, setPreUpdate] = useState();
    const [preClickShow, setPreClickShow] = useState();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Số Xe', field: 'Car_Number' },
            { title: 'Tên Xe', field: 'Passenger_Car_Name' },
            { title: 'Giá Vé', field: 'Passenger_Car_fare' },
            { title: 'Số Ghế', field: 'Passenger_Car_Seats' },
            { title: 'Kiểu Xe', field: 'Category_Style' },
            { title: 'Tầng', field: 'Category_Floor' },
            { title: 'Số Điện Thoại', field: 'phone' },
            { title: 'Nơi Đi', field: 'Trips_Start' },
            { title: 'Nới Đến', field: 'Trips_Ends' },
        ],
        columnsInfo: [
            { title: 'Số Xe', field: 'Car_Number' },
            { title: 'Tên Xe', field: 'Passenger_Car_Name' },
            { title: 'Nơi Đi', field: 'Trips_Start' },
            { title: 'Nơi Đến', field: 'Trips_Ends' },
            { title: 'Ngày Đi', field: 'Trips_Passenger_Car_Date' },
            { title: 'Thời Gian Đi', field: 'Trips_Passenger_Car_Time_Start' },
            { title: 'Thời Gian Đến', field: 'Trips_Passenger_Car_Time_End' },
        ],
        columnsShow: [
            { title: 'Tên Khách Hàng', field: 'Car_Ticket_Name_User' },
            { title: 'SĐT', field: 'Car_Ticket_Phone' },
            { title: 'Ngày ĐVé', field: 'created_at' },
            { title: 'Ngày Đi', field: 'Trips_Passenger_Car_Date' },
            { title: 'Ghế', field: 'Seats_Position' },
            { title: 'Giá Vé', field: 'Passenger_Car_fare' },
            { title: 'Điểm Đi', field: 'Car_Ticket_Start_Point' },
            { title: 'Điểm Đến', field: 'Car_Ticket_End_Point ' },
            { title: 'Chú Thích', field: 'Car_Ticket_Note' },
        ],
        data: []
    });
    const [values, setValues] = useState({
        modal: false,
        id: '',
        name: '',
        carnumber: '',
        category_car: '',
        from: '',
        to: '',
        date: moment(new Date()).format('YYYY-MM-DD'),
        timeStart: new Date(),
        timeEnd: new Date()

    });

    /**
     * get list car by id
     */
    const fetchListCar = (async () => {
        let parent_id = JSON.parse(sessionStorage.getItem('tokens')).Parent_id ? JSON.parse(sessionStorage.getItem('tokens')).Parent_id : JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        await axios.get(`${common.HOST}admin/get-list-car/${parent_id}`)
            .then(res => { res.data ? setState({ ...state, data: res.data }) : null })
            .catch(err => { throw err; })

    });

    const handleDateChangeDate = (date => {
        setValues({ ...values, date: moment(date).format('YYYY-MM-DD') });
    })
    const handleDateChangeTimeStart = ((date) => {
        setValues({ ...values, timeStart: date });
    })
    const handleDateChangeTimeEnd = ((date) => {
        setValues({ ...values, timeEnd: date });
    })
    /**
     * when click button update
     */
    const onClickButtonSend = useCallback(
        async (event) => {
            event.preventDefault();
            let id = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
            let updated_by = JSON.parse(sessionStorage.getItem('tokens')).Admin_Name;
            let data = {
                id_car: preUpdate.Passenger_Car_Id,
                id_trip: preUpdate.Trips_ID,
                date: values.date,
                timeStart: moment(values.timeStart).format('h:mm:ss'),
                timeEnd: moment(values.timeEnd).format('h:mm:ss')
            };
            await axios.post(`${common.HOST}admin/create-trip-passenger-car`, data)
                .then(res => {
                    setValues({ ...values, modal: false });
                    res.data[0].result == 'false' ? CommonAlert.showAlert('error', 'Create fail!')
                        : CommonAlert.showAlert('success', 'Create success!')
                })
                .catch(err => { throw err });
        }
    )
    /**
     * click icon update table
     */
    const onClickButtonUpdate = (event, data) => {
        event.preventDefault();
        setValues({
            ...values,
            modal: true,
            id: data.Passenger_Car_Id,
            name: data.Passenger_Car_Name,
            carnumber: data.Car_Number,
            category_car: data.Category_Id,
            from: data.Trips_Start,
            to: data.Trips_Ends,
            date: data.Trips_Passenger_Car_Date ? data.Trips_Passenger_Car_Date : moment(new Date()).format('YYYY-MM-DD'),
            timeStart: data.Trips_Passenger_Car_Time_Start ? new Date(`${data.Trips_Passenger_Car_Date}:${data.Trips_Passenger_Car_Time_Start}`) : new Date(),
            timeEnd: data.Trips_Passenger_Car_Time_End ? new Date(`${data.Trips_Passenger_Car_Date}:${data.Trips_Passenger_Car_Time_End}`) : new Date()
        });
        setPreUpdate(data);
    }
    /**
     * close modal
     */
    const handleClose = () => {
        setValues({ ...values, modal: false })
    }
    /**
     * when click button delete
     */
    const onClickButtonDelete = ((event, data) => {
        event.preventDefault();
        let id = data.Passenger_Car_Id;
        let name_admin = JSON.parse(sessionStorage.getItem('tokens')).Admin_Name;
        let dataSendDelete = {
            id: id,
            user_deleted: name_admin
        };

        Swal.fire({
            title: 'Bạn Muốn Xóa?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Xóa Ngay!'
        }).then(async (result) => {
            if (result.value) {
                let dataJustChange = {
                    ...data,
                    car_status: 1,
                    deleted_by: name_admin,
                    deleted_at: moment(new Date()).format('YYYY-MM-DD h:mm:ss')
                };
                let dataPre = [...state.data];
                dataPre[dataPre.indexOf(data)] = dataJustChange;

                await axios.post(`${common.HOST}admin/delete-car`, dataSendDelete)
                    .then(res => {
                        res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Xóa thất bại!')
                            : (
                                setState({ ...state, data: dataPre }),
                                CommonAlert.showAlert('success', 'Thành công!')
                            )
                    })
                    .catch(err => { throw err; })
            }
        })
    })
    const onClickButtonShowTicket = (async (event, data) => {
        event.preventDefault();
        setIsClickShow(true),
            setIsClickInfo(false),
            setPreClickShow({ ...preClickShow, data: data });
        await axios.get(`${common.HOST}admin/get-ticket-by-car/${data.Trips_Passenger_Car_Id}`)
            .then(res => { res.data ? (setDataShow(res.data)) : null })

            .catch(err => { throw err; })
    })

    const onClickRowTable = ((event, dataRow) => {
        event.preventDefault();

    });
    /**
     * fetch data Trips just register. when click icon info
     */
    const onClickButtonInfo = (async (event, dataRow) => {
        event.preventDefault();
        setPreClickShow({ ...preClickShow, fare: dataRow.Passenger_Car_fare })
        await axios.get(`${common.HOST}admin/get-list-trips-passenger-car/${dataRow.Passenger_Car_Id}`)
            .then(res => { res.data ? (setDataInfo({ data: res.data }), setIsClickInfo(true)) : setIsClickInfo(false) })
            .catch(err => { throw err; })
    })
    const onClickButtonSendUpdate = (async (event) => {
        event.preventDefault();
        let data = {
            id: preUpdate.Trips_Passenger_Car_Id,
            date: values.date,
            timeStart: moment(values.timeStart).format('h:mm:ss'),
            timeEnd: moment(values.timeEnd).format('h:mm:ss')
        };
        let dataInfoPre = [...dataInfo.data];
        let dataPreUpd = { ...preUpdate, Trips_Passenger_Car_Date: values.date, Trips_Passenger_Car_Time_End: moment(values.timeEnd).format('h:mm:ss'), Trips_Passenger_Car_Time_Start: moment(values.timeStart).format('h:mm:ss') };
        dataInfoPre[dataInfoPre.indexOf(preUpdate)] = dataPreUpd;

        await axios.post(`${common.HOST}admin/update-trips-passenger-car`, data)
            .then(res => {
                setValues({ ...values, modal: false });
                res.data[0].result == 'false' ? CommonAlert.showAlert('error', 'Thất bại!')
                    : (CommonAlert.showAlert('success', 'Thành công!'), setDataInfo({ ...dataInfo, data: dataInfoPre }))
            })
            .catch(err => { throw err });
    });
    /**
     * useEffect
     */
    useEffect(() => {
        fetchListCar();
        // fetchRole();
        let role_id_login = JSON.parse(sessionStorage.getItem('tokens')).Roles_Id;
        setIdLogin(role_id_login);
    }, [])


    return (
        <div className="container-fluid">
            <MaterialTable
                title={
                    isClickShow
                        ? <div className="d-flex flex-row align-items-center justify-content-between
                    "  style={{ width: '120%' }}>
                            <div className="btn" style={{ fontSize: '20px' }} onClick={(event) => { event.preventDefault(); setIsClickShow(false), setIsClickInfo(true); }}> <i className="fas fa-arrow-circle-left"></i></div>
                            <div><u>Biển số xe </u>: {preClickShow.data ? preClickShow.data.Car_Number : ''} &nbsp;</div>
                            <div style={{ width: '50%' }}><u>Tổng tiền</u> :  <NumberFormat
                                value= {  preClickShow.fare ? ( dataShow.length * preClickShow.fare ) : 0}
                                displayType={'text'} thousandSeparator={true}
                            />  đ</div>
                        </div>
                        : !isClickInfo ? "Danh Sách Tuyến"
                            :
                            <div className="d-flex flex-row align-items-center">
                                <div className="btn" style={{ fontSize: '20px' }} onClick={(event) => { event.preventDefault(); setIsClickInfo(false); }}> <i className="fas fa-arrow-circle-left"></i> </div>
                                <h5>Danh Sách Tuyến Của Xe</h5>
                            </div>

                }
                columns={isClickShow ? state.columnsShow : !isClickInfo ? state.columns : state.columnsInfo}
                data={isClickShow ? dataShow : !isClickInfo ? state.data : dataInfo.data}
                onRowClick={(event, selectRow) => onClickRowTable(event, selectRow)}
                actions={[
                    rowData => ((1 == 1 && !isClickInfo && !isClickShow) ? {
                        icon: 'info',
                        tooltip: 'Thông Tin Hành Trình',
                        onClick: (event, rowData) => {
                            onClickButtonInfo(event, rowData)
                        }
                    } : null),
                    rowData => ((1 == 1 && !isClickInfo && !isClickShow) ? {
                        icon: 'add',
                        tooltip: 'Thêm Hành Trình',
                        iconProps: { style: { color: "#28a745" } },
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData);
                        }
                    } : null),
                    rowData => ((isClickInfo) ? {
                        icon: 'edit',
                        iconProps: { style: { color: "#007bff" } },
                        tooltip: 'Cập Nhật Hành Trình',
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData);
                        }
                    } : null),
                    rowData => ((isClickInfo) ? {
                        icon: 'visibility',
                        tooltip: 'Danh Sách Vé',
                        onClick: (event, rowData) => {
                            onClickButtonShowTicket(event, rowData);
                        }
                    } : null)
                ]}
            />
            <div className={classes.root}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={values.modal}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    className={classes.modal}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={values.modal}>
                        <div className={classes.paper}>
                            <h4 className="my-3 text-center" id="transition-modal-title">Cập Nhật Hành Trình</h4>
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="form-group ">
                                        <TextField
                                            disabled
                                            label="Tên Xe"
                                            type="search"
                                            variant="outlined"
                                            name="name"
                                            value={values.name}
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            name="carnumber"
                                            value={values.carnumber}
                                            label="Số Xe"
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <div className="form-group ">
                                            <TextField
                                                disabled
                                                label="Nơi Đi"
                                                type="search"
                                                variant="outlined"
                                                value={preUpdate ? preUpdate.Trips_Start : ''}
                                            />
                                        </div>
                                        <div className="form-group ">
                                            <TextField
                                                disabled
                                                label="Nơi Đến"
                                                type="search"
                                                variant="outlined"
                                                value={preUpdate ? preUpdate.Trips_Ends : ''}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group ">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                label="Ngày Đi"
                                                format="yyyy-MM-dd"
                                                name="date"
                                                value={values.date}
                                                onChange={handleDateChangeDate}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="form-group ">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                label="Thời Gian Đi"
                                                name="timeStart"
                                                value={values.timeStart}
                                                onChange={handleDateChangeTimeStart}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                margin="normal"
                                                label="Thời Gian Đến"
                                                value={values.timeEnd}
                                                onChange={handleDateChangeTimeEnd}
                                                name="timeEnd"
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <Button
                                        // disabled={values.seat && values.to && values.from && values.fare && values.name && values.phone && values.category_car && !values.errName && !values.errPhone && !values.errCarNumber ? false : true}
                                        variant="contained"
                                        color="primary"
                                        endIcon={<Icon>send</Icon>}
                                        onClick={!isClickInfo ? onClickButtonSend : onClickButtonSendUpdate}
                                    >
                                        Lưu
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>

        </div>
    )
}
