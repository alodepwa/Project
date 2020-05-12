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
    const classes                       = useStyles();
    const [idLogin, setIdLogin]         = useState('');
    const [isClickInfo, setIsClickInfo] = useState(false);
    const [isClickShow, setIsClickShow] = useState(false);
    const [dataInfo, setDataInfo]       = useState({
        data : [],
        Car_Number : '',
        Passenger_Car_Name : '',
        Trips_Start : ''
    });
    const [dataShow, setDataShow] = useState([]);
    const [preUpdate, setPreUpdate]     = useState();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Car ID', field: 'Car_Number' },
            { title: 'Car Name', field: 'Passenger_Car_Name' },
            { title: 'Fare', field: 'Passenger_Car_fare' },
            { title: 'Seats', field: 'Passenger_Car_Seats' },
            { title: 'Category', field: 'Category_Style' },
            { title: 'Floor', field: 'Category_Floor' },
            { title: 'Phone', field: 'phone' },
            { title: 'From', field: 'Trips_Start' },
            { title: 'To', field: 'Trips_Ends' },
        ],
        columnsInfo: [
            { title: 'Car ID', field: 'Car_Number' }, 
            { title: 'Car Name', field: 'Passenger_Car_Name' },
            { title: 'From', field: 'Trips_Start' },
            { title: 'To', field: 'Trips_Ends' },
            { title: 'Date', field: 'Trips_Passenger_Car_Date' },
            { title: 'Time Start', field: 'Trips_Passenger_Car_Time_Start' },
            { title: 'Time End', field: 'Trips_Passenger_Car_Time_End' },
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
        date        : moment( new Date()).format('YYYY-MM-DD'),
        timeStart   : new Date(),
        timeEnd     : new Date()

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
    
    const handleDateChangeDate = ( date =>{
        setValues({...values, date : moment(date).format('YYYY-MM-DD')});
    })
    const handleDateChangeTimeStart = ((date)=>{
        setValues({...values, timeStart : date });
    })
    const handleDateChangeTimeEnd = ((date)=>{
        setValues({...values, timeEnd : date});
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
                id_car      : preUpdate.Passenger_Car_Id,
                id_trip     : preUpdate.Trips_ID,
                date        : values.date,
                timeStart   : moment(values.timeStart).format('h:mm:ss'),
                timeEnd     : moment(values.timeEnd).format('h:mm:ss')
            };
            await axios.post(`${common.HOST}admin/create-trip-passenger-car`, data)
                .then(res => {
                    setValues({...values, modal : false });
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
            modal           : true,
            id              : data.Passenger_Car_Id,
            name            : data.Passenger_Car_Name,
            carnumber       : data.Car_Number,
            category_car    : data.Category_Id,
            from            : data.Trips_Start,
            to              : data.Trips_Ends,
            date            : data.Trips_Passenger_Car_Date ? data.Trips_Passenger_Car_Date : moment( new Date()).format('YYYY-MM-DD'),
            timeStart       : data.Trips_Passenger_Car_Time_Start ? new Date(`${data.Trips_Passenger_Car_Date}:${data.Trips_Passenger_Car_Time_Start}`) : new Date() ,
            timeEnd         : data.Trips_Passenger_Car_Time_End ? new Date(`${data.Trips_Passenger_Car_Date}:${data.Trips_Passenger_Car_Time_End}`) : new Date()
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
            title: 'Are you Delete?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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
                        res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Delete fail!')
                            : (
                                setState({ ...state, data: dataPre }),
                                CommonAlert.showAlert('success', 'Create success!')
                            )
                    })
                    .catch(err => { throw err; })
            }
        })
    })
    const onClickButtonShowTicket = (async (event, data) => {
        event.preventDefault();
        setIsClickShow(true),
        setIsClickInfo(false)
        await axios.get(`${common.HOST}admin/get-ticket-by-car/${data.Trips_Passenger_Car_Id}`)
        .then(res => { res.data ?(setDataShow( res.data ))  : null })
        
        .catch(err => { throw err; })
    })

    const onClickRowTable = ((event, dataRow) => {
        event.preventDefault();
        
    });
    /**
     * fetch data Trips just register. when click icon info
     */
    const onClickButtonInfo = ( async (event, dataRow) => {
        event.preventDefault();
        await axios.get(`${common.HOST}admin/get-list-trips-passenger-car/${dataRow.Passenger_Car_Id}`)
            .then(res => { res.data ? (setDataInfo({ data : res.data }), setIsClickInfo(true) ) : setIsClickInfo(false) })
            .catch(err => { throw err; })
    })
    const onClickButtonSendUpdate = (async (event) =>{
        event.preventDefault();
        let data = {
            id          : preUpdate.Trips_Passenger_Car_Id,
            date        : values.date,
            timeStart   : moment(values.timeStart).format('h:mm:ss'),
            timeEnd     : moment(values.timeEnd).format('h:mm:ss')
        };
        let dataInfoPre    = [...dataInfo.data];
        let dataPreUpd  = { ...preUpdate, Trips_Passenger_Car_Date : values.date, Trips_Passenger_Car_Time_End : moment(values.timeEnd).format('h:mm:ss'), Trips_Passenger_Car_Time_Start : moment(values.timeStart).format('h:mm:ss') };
        dataInfoPre[dataInfoPre.indexOf(preUpdate)] = dataPreUpd;
        
        await axios.post(`${common.HOST}admin/update-trips-passenger-car`, data)
            .then(res => {
                setValues({...values, modal : false});
                res.data[0].result == 'false' ? CommonAlert.showAlert('error', 'Create fail!')
                    : ( CommonAlert.showAlert('success', 'Create success!'),setDataInfo({...dataInfo, data : dataInfoPre })  )
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
        <div className="container">
            <MaterialTable
                title={ 
                    isClickShow 
                    ?   <div className="d-flex flex-row align-items-center justify-content-between
                    "  style={{width : '120%'}}>
                            <div className="btn" style={{fontSize : '20px'}} onClick = {(event)=>{event.preventDefault(); setIsClickShow(false),setIsClickInfo(true);} }> <i className="fas fa-arrow-circle-left"></i></div> 
                            <div><u>Biển số xe </u>: 012341234</div>
                            <div style={{width : '50%'}}><u>Tổng tiền</u> : 1000,000 đ</div>
                        </div> 
                    :   !isClickInfo ? "List Trips" 
                    : 
                    <div className="d-flex flex-row align-items-center">
                        <div className="btn" style={{fontSize : '20px'}} onClick = {(event)=>{event.preventDefault(); setIsClickInfo(false);} }> <i className="fas fa-arrow-circle-left"></i> </div> 
                        <h5>List Trips With Passenger Car</h5>
                    </div>
                        
                }
                columns={ isClickShow ? state.columnsShow : !isClickInfo ? state.columns : state.columnsInfo  }
                data={ isClickShow ? dataShow : !isClickInfo ? state.data : dataInfo.data }
                onRowClick={(event, selectRow) => onClickRowTable(event, selectRow)}
                actions={[
                    rowData => ((1 == 1 && !isClickInfo && !isClickShow) ? {
                        icon: 'info',
                        tooltip: 'Info Trip',
                        onClick: (event, rowData) => {
                            onClickButtonInfo(event, rowData)
                        }
                    } : null),    
                    rowData => ((1 == 1 && !isClickInfo && !isClickShow) ? {
                        icon: 'add',
                        tooltip: 'Add Trip',
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData);
                        }
                    } : null),
                    rowData => ((isClickInfo) ? {
                        icon: 'edit',
                        tooltip: 'Update Trip',
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData);
                        }
                    } : null),
                    rowData => ((isClickInfo) ? {
                        icon: 'visibility',
                        tooltip: 'Show Ticket',
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
                            <h4 id="transition-modal-title">Update Trip</h4>
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="form-group ">
                                        <TextField
                                            disabled
                                            label="Car name"
                                            type="search"
                                            variant="outlined"
                                            name="name"
                                            value = { values.name }
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            name="carnumber"
                                            value={values.carnumber}
                                            label="Car Number"
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <div className="form-group ">
                                            <TextField
                                                disabled
                                                label="From"
                                                type="search"
                                                variant="outlined"
                                                value={ preUpdate ? preUpdate.Trips_Start : '' }
                                            />
                                        </div>
                                        <div className="form-group ">
                                            <TextField
                                                disabled
                                                label="To"
                                                type="search"
                                                variant="outlined"
                                                value={ preUpdate ? preUpdate.Trips_Ends : '' }
                                            />
                                        </div>
                                    </div>
                                   
                                    <div className="form-group ">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                label   = "Date Start"
                                                format  = "yyyy-MM-dd"
                                                name    = "date"
                                                value   = {  values.date }
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
                                                label="Time Start"
                                                name    = "timeStart"
                                                value   = {  values.timeStart  }
                                                onChange={handleDateChangeTimeStart}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                margin="normal"
                                                label="Time End"
                                                value   = { values.timeEnd  }
                                                onChange={handleDateChangeTimeEnd}
                                                name = "timeEnd"
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
                                        onClick={ !isClickInfo ? onClickButtonSend : onClickButtonSendUpdate }
                                    >
                                        Save
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
