import React, { useEffect, useState, useCallback } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import * as common from './../../common';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import * as CommonAlert from './../Common/ShowAlert';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function LayoutListCar() {
    const classes = useStyles();
    const [idLogin, setIdLogin] = useState('');
    const [trips, setTrips] = useState({
        end: [],
        start: []
    });
    const [categoryCar, setCategoryCar] = useState([]);
    const [preUpdate, setPreUpdate] = useState();
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
            { title: 'Nơi Đến', field: 'Trips_Ends' },
            { title: 'Ngày Tạo', field: 'created_at' },
            { title: 'Người Tạo', field: 'created_by' },
            { title: 'Ngày Cập Nhật', field: 'updated_at' },
            { title: 'NGười Cập Nhật', field: 'updated_by' },
            { title: 'Ngày Xóa', field: 'deleted_at' },
            { title: 'Người Xóa', field: 'deleted_by' }
        ],
        data: [],
    });
    const [values, setValues] = useState({
        modal: false,
        id: '',
        name: '',
        seat: '',
        fare: '',
        carnumber: '',
        phone: '',
        category_car: '',
        from: '',
        to: '',
        errName: '',
        errPhone: '',
        errCarNumber: '',
        errFare : '',
        errSeat : ''
    });
    const getTrips = async () => {
        await axios.get(`${common.HOST}home`).then(res => {
            if (res.data) {
                setTrips({ end: res.data['end'], start: res.data['start'] });
            }
        }).catch(err => { throw err });
    }
    const getCategoryCar = async () => {
        await axios.get(`${common.HOST}admin/get-category-car`).then(res => {
            if (res.data) {
                setTimeout(() => {
                    setCategoryCar(res.data);
                }, 500);
            }
        }).catch(err => { throw err });
    }
    /**
     * get list car by id
     */
    const fetchListCar = (async () => {
        let parent_id = JSON.parse(sessionStorage.getItem('tokens')).Parent_id ? JSON.parse(sessionStorage.getItem('tokens')).Parent_id : JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        await axios.get(`${common.HOST}admin/get-list-car/${parent_id}`)
            .then(res => { res.data ? setState({ ...state, data: res.data }) : null })
            .catch(err => { throw err; })

    });
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
                Car_Number: values.carnumber,
                Passenger_Car_Name: values.name,
                phone: values.phone,
                Passenger_Car_fare: values.fare,
                Passenger_Car_Seats: values.seat,
                admin_id: id,
                category_car: values.category_car,
                name_admin: updated_by,
                Trips_Start: values.from,
                Trips_Ends: values.to
            };
            let data1 = {
                ...preUpdate,
                phone: values.phone,
                category_car: values.category_car,
                Trips_Ends: values.to,
                Trips_Start: values.from,
                updated_by: updated_by,
                Car_Number: values.carnumber,
                Passenger_Car_Name: values.name,
                Passenger_Car_fare: values.fare,
                Passenger_Car_Seats: values.seat,
                updated_at: moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            }
            let data_pre_update = preUpdate;
            const dataPre = [...state.data];
            dataPre[dataPre.indexOf(data_pre_update)] = data1;
            await axios.post(`${common.HOST}admin/update-car`, data)
                .then(res => {
                    res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Thất bại!')
                        : (
                            setValues({ ...values, modal: false }),
                            setState({ ...state, data: dataPre }),
                            CommonAlert.showAlert('success', 'Thành công!')
                        )
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
            seat: data.Passenger_Car_Seats,
            fare: data.Passenger_Car_fare,
            carnumber: data.Car_Number,
            phone: data.phone,
            category_car: data.Category_Id,
            from: data.Trips_Start,
            to: data.Trips_Ends,
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
     * featch data role
     */
    async function fetchRole() {
        await axios.get(`${common.HOST}admin/get-role`)
            .then(role => {
                role.data ? setValues({ ...values, role: role.data }) : null
            })
            .catch(e => { throw err; })
    };

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
            title: 'Banh Có Muốn Xóa?',
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
                                CommonAlert.showAlert('success', 'Tạo thành công!')
                            )
                    })
                    .catch(err => { throw err; })
            }
        })
    })
    const onChangeInput = (event) => {
        event.preventDefault();
        let { value } = event.target;
        switch (event.target.name) {
            case 'phone':
                let parrtenPhone = /^[0][1-9][0-9]{7,9}$/
                let errPhone = 'Phone isn\'t correctly!';
                parrtenPhone.test(value) ? setValues({ ...values, [event.target.name]: value, errPhone: '' }) : setValues({ ...values, errPhone, err: '' });
                break; 
            case 'name':
                let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><]*$/;
                let errName = 'Name isn\'t correctly format!';
                parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errName: '' }) : setValues({ ...values, errName, err: '' });
                break;
            case 'carnumber':
                let parrtenTextNumber = /^[0-9]{1,2}[A-Z][0-9][-][0-9]{3,5}$/
                let errCarNumber = 'Car number isn\'t correct format!';
                parrtenTextNumber.test(value) ? setValues({ ...values, [event.target.name]: value, errCarNumber: '' }) : setValues({ ...values, errCarNumber, err: '' });
                break;
            case 'fare':
                let parrtenFare = /^[0-9]*$/;
                let errFare = 'Car number isn\'t correct format!';
                parrtenFare.test(value) ? setValues({ ...values, [event.target.name]: value, errFare: '' }) : setValues({ ...values, errFare, err: '' });
                break;
            case 'seat':
                let parrtenSeat = /^[0-9]*$/;
                let errSeat = 'Car number isn\'t correct format!';
                parrtenSeat.test(value) && (value > 0 && value < 50) ? setValues({ ...values, [event.target.name]: value, errSeat: '' }) : setValues({ ...values, errSeat, err: '' });
                break;
            case 'from':
                if (values.to != event.target.value)
                    setValues({ ...values, [event.target.name]: event.target.value });
                else
                    setValues({ ...values, [event.target.name]: false });
                break;
            case 'to':
                if (values.from != event.target.value)
                    setValues({ ...values, [event.target.name]: event.target.value });
                else
                    setValues({ ...values, [event.target.name]: false });
                break;
            default:
                setValues({ ...values, [event.target.name]: event.target.value });
                break;
        }
    }
    /**
     * useEffect
     */
    useEffect(() => {
        fetchListCar();
        getTrips();
        getCategoryCar();
        // fetchRole();
        let role_id_login = JSON.parse(sessionStorage.getItem('tokens')).Roles_Id;
        setIdLogin(role_id_login);
    }, [])


    return (
        <div className="container-fluid">
            <MaterialTable
                title="Danh Sách Xe"
                columns={state.columns}
                data={state.data}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Cập Nhật',
                        iconProps: { style: { color: "#007bff" } },
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData)
                        }
                    },
                    rowData => ((idLogin == '2' && rowData.car_status == 0) ? {
                        icon: 'delete',
                        iconProps: { style: { color: "red" } },
                        tooltip: 'Xóa ',
                        onClick: (event, rowData) => {
                            onClickButtonDelete(event, rowData);
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
                            <h4 className="my-3 text-center" id="transition-modal-title">Cập Nhật Xe</h4>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            error={values.errName ? true : false}
                                            required={true}
                                            label="Tên Xe"
                                            type="search"
                                            variant="outlined"
                                            name="name"
                                            value={values.name}
                                            label={values.errName ? "Tên Xe không đúng định dạng!" : "Tên Xe"}
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            required={true}
                                            error = { values.errFare ? true : false }
                                            label="Giá Vé"
                                            type="text"
                                            value={values.fare}
                                            step={1}
                                            variant="outlined"
                                            name="fare"
                                            onChange={onChangeInput}
                                            label={values.errFare ? "Giá Vé yêu cầu giá trị số!" : "Giá Vé"}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            label="Số Ghế"
                                            error = {values.errSeat ? true : false}
                                            required={true}
                                            type="text"
                                            value={values.seat}
                                            variant="outlined"
                                            name="seat"
                                            onChange={onChangeInput}
                                            label={values.errSeat ? "Số Ghế cần số và nhỏ hơn 50!" : "Số Ghế"}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            error={values.errPhone ? true : false}
                                            required={true}
                                            label="Số Điện Thoại"
                                            type="number"
                                            variant="outlined"
                                            name="phone"
                                            value={values.phone}
                                            onChange={onChangeInput}
                                            label={values.errPhone ? "Số điện thoại không đúng định dạng!" : "Số Điện Thoại"}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            error={values.errCarNumber ? true : false}
                                            required={true}
                                            type="text"
                                            variant="outlined"
                                            name="carnumber"
                                            value={values.carnumber}
                                            onChange={onChangeInput}
                                            label={values.errCarNumber ? "Số xe không đúng định dạng!  Ví Dụ : '43H1-43136' " : "Số Xe. Ví Dụ : '43H1-43136'"}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <FormControl variant="outlined" >
                                            <InputLabel htmlFor="outlined-age-native-simple">Loại Xe</InputLabel>
                                            <Select
                                                native
                                                value={values.category_car}
                                                onChange={onChangeInput}
                                                name="category_car"
                                                label="Loại Xe"

                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    categoryCar.map((value, key) => {
                                                        return <option value={value.Category_Id} key={key}>{`${value.Category_Style} - ${value.Category_Floor} tầng`}</option>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="form-group d-flex ">
                                        <FormControl variant="outlined" >
                                            <InputLabel htmlFor="outlined-age-native-simple">{values.from === false ? "Nơi đi không được trùng!" : "Nơi đi"}</InputLabel>
                                            <Select
                                                native
                                                value={values.from}
                                                onChange={onChangeInput}
                                                name="from"
                                                error={values.from === false ? true : false}
                                                label='Nơi đi không được trùng!'

                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    trips.start.map((value, key) => {
                                                        return <option value={value.Trips_Start} key={key}>{value.Trips_Start}</option>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="outlined" >
                                            <InputLabel htmlFor="outlined-age-native-simple">{values.to === false ? "Nơi đến không được trùng!" : "Nơi đến"}</InputLabel>
                                            <Select
                                                native
                                                value={values.to}
                                                onChange={onChangeInput}
                                                name="to"
                                                error={values.to === false ? true : false}
                                                label='Nơi đi không được trùng!'

                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    trips.end.map((value, key) => {
                                                        return <option value={value.Trips_Ends} key={key}>{value.Trips_Ends}</option>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <Button
                                        disabled={values.seat && values.to && values.from && values.fare && values.name && values.phone && values.category_car && !values.errName && !values.errPhone && !values.errCarNumber ? false : true}
                                        variant="contained"
                                        color="primary"
                                        endIcon={<Icon>send</Icon>}
                                        onClick={onClickButtonSend}
                                    >
                                        Cập Nhật
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
