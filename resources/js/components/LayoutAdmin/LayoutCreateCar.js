import React, { useState, useEffect, useCallback } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import * as common from './../../common';
import axios from 'axios';
import * as commonAlert from './../Common/ShowAlert';
export default function LayoutCreateCar() {
    const [trips, setTrips] = useState({
        end: [],
        start: []
    });
    const [categoryCar, setCategoryCar] = useState([]);
    const [values, setValues] = useState({
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
                let parrtenTextNumber = /^[0-9]{1,2}[A-Z][0-9][-][0-9]{3,6}$/;
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
                parrtenSeat.test(value) && (value > 0 && value < 50 ) ? setValues({ ...values, [event.target.name]: value, errSeat: '' }) : setValues({ ...values, errSeat, err: '' });
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

    const onClickButtonSend = async (event) => {
        event.preventDefault();
        var admin_id_login = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        let admin_name_login = JSON.parse(sessionStorage.getItem('tokens')).Admin_Name;
        let data = {
            carnumber: values.carnumber,
            name: values.name,
            phone: values.phone,
            fare: values.fare,
            seat: values.seat,
            admin_id: admin_id_login,
            category_car: values.category_car,
            created_by: admin_name_login,
            from: values.from,
            to: values.to
        }
        await axios.post(`${common.HOST}admin/create-car`, data)
            .then(res => res.data[0].result == 'true' ? commonAlert.showAlert('success', 'thêm mới thành công!') : commonAlert.showAlert('error', ' thêm mới thất bại!'))
            .catch(err => { throw err; })
    }

    useEffect(() => {
        getTrips();
        getCategoryCar();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-10 col-md-9 col-lg-5 text-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <h5>Tạo Xe</h5>
                            </div>
                            <div className="form-group d-flex flex-column">
                                <TextField
                                    required={true}
                                    error={values.errName ? true : false}
                                    type="search"
                                    variant="outlined"
                                    name="name"
                                    label={values.errName ? "Tên Xe không đúng định dạng!" : "Tên Xe"}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="form-group d-flex flex-column">
                                <TextField
                                    error = { values.errFare ? true : false }
                                    label="Giá Vé"
                                    type="text"
                                    required={true}
                                    step={1}
                                    variant="outlined"
                                    name="fare"
                                    onChange={onChangeInput}
                                    label={values.errFare ? "Giá Vé yêu cầu giá trị số!" : "Giá Vé"}
                                />
                            </div>
                            <div className="form-group d-flex flex-column">
                                <TextField
                                    error = {values.errSeat ? true : false}
                                    type="text"
                                    required={true}
                                    variant="outlined"
                                    inputProps={{ maxLength: 12 }}
                                    name="seat"
                                    onChange={onChangeInput}
                                    label={values.errSeat ? "Số Ghế cần số và nhỏ hơn 50!" : "Số Ghế"}
                                />
                            </div>
                            <div className="form-group d-flex flex-column">
                                <TextField
                                    error={values.errPhone ? true : false}
                                    type="number"
                                    required={true}
                                    variant="outlined"
                                    name="phone"
                                    onChange={onChangeInput}
                                    label={values.errPhone ? "SĐT không đúng định dạng!" : "Số Điện Thoại"}
                                />
                            </div>
                            <div className="form-group d-flex flex-column">
                                <TextField
                                    error={values.errCarNumber ? true : false}
                                    type="search"
                                    variant="outlined"
                                    required={true}
                                    name="carnumber"
                                    onChange={onChangeInput}
                                    label={values.errCarNumber ? "Biển Số Xe không đúng định dạng!  Ví Dụ : '43H1-43136' " : "Biển Số Xe. Ví Dụ: '43H1-43136'"}
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
                                disabled={values.seat && values.to && values.from && values.fare && values.name && values.phone && values.category_car && !values.errName && !values.errPhone && !values.errCarNumber  && !values.errFare && !values.errSeat ? false : true}
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                                onClick={onClickButtonSend}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
