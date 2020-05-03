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
    const [trips, setTrips ]                = useState([]);
    const [categoryCar, setCategoryCar ]    = useState([]);
    const [values, setValues]               = useState({
        name            : '',
        seat            : '',
        fare            : '',
        carnumber       : '',
        phone           : '',
        category_car    : '',
        from            : '',
        to              : '',
        errName         : '',
        errPhone        : '',
        errCarNumber    : ''

    });
    const getTrips = async () => {
        await axios.get(`${common.HOST}home`).then( res => {
			if(res.data){	
				setTrips(res.data);
			}			
		}).catch(err => {throw err});
    }
    const getCategoryCar = async () => {
        await axios.get(`${common.HOST}admin/get-category-car`).then( res => {
			if(res.data){	
				setTimeout(() => {
                    setCategoryCar(res.data);
                }, 500);
			}			
		}).catch(err => {throw err});
    }

    const onChangeInput = (event) => {
        event.preventDefault();
        let { value } = event.target;
        if (event.target.name == "phone") {
            let parrtenPhone = /^[0][1-9][0-9]{7,9}$/;
            let errPhone = 'Phone isn\'t correctly!'
            parrtenPhone.test(value) ? setValues({ ...values, [event.target.name]: value, errPhone: '' }) : setValues({ ...values, errPhone, err: '' });
        }
        if (event.target.name == "name") {
            let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><]*$/;
            let errName = 'Name isn\'t correctly format!';
            parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errName: '' }) : setValues({ ...values, errName, err: '' });

        }
        if (event.target.name == "carnumber") {
            let parrtenText = /^[0-9]{1,2}[A-Z][0-9][-][0-9]{3,6}$/
            let errCarNumber = 'Car number isn\'t correct format!';
            parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errCarNumber: '' }) : setValues({ ...values, errCarNumber, err: '' });
        }
        else{
            setValues({ ...values, [event.target.name] : event.target.value });
        }
    }
   
    const onClickButtonSend = async (event) => {
        event.preventDefault();
        var admin_id_login    = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        let admin_name_login  = JSON.parse(sessionStorage.getItem('tokens')).Admin_Name;
        let data = {
            carnumber   : values.carnumber,
            name        : values.name,
            phone       : values.phone,
            fare        : values.fare,
            seat        : values.seat,
            admin_id    : admin_id_login,
            category_car: values.category_car,
            created_by  : admin_name_login,
            from        : values.from,
            to          : values.to
        }
        await axios.post(`${common.HOST}admin/create-car`, data)
        .then( res => res.data[0].result == 'true' ? commonAlert.showAlert('success', 'thêm mới thành công!') : commonAlert.showAlert('error', ' thêm mới thất bại!'))
        .catch(err => { throw err; })
    }

    useEffect(() => {
        getTrips();
        getCategoryCar();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-5">
                    <div className="form-group d-flex flex-column">
                        <TextField
                            error       = { values.errName ? true : false }
                            label       = "Car name"
                            type        = "search"
                            variant     = "outlined"
                            name        = "name"
                            label       = {values.errName ? "Car Name incorrect format!" : "Car Name"}
                            onChange    = {onChangeInput}
                        />
                    </div>
                    <div className="form-group d-flex flex-column">
                        <TextField
                            label       = "Car fare"
                            type        = "number"
                            step        = {1}
                            variant     = "outlined"
                            name        = "fare"
                            onChange    = {onChangeInput}
                        />
                    </div>
                    <div className="form-group d-flex flex-column">
                        <TextField
                            label       = "Car seats"
                            type        = "number"
                            variant     = "outlined"
                            name        = "seat"
                            onChange    = {onChangeInput}
                        />
                    </div>
                    <div className="form-group d-flex flex-column">
                        <TextField
                            error       = { values.errPhone ? true : false }
                            label       = "Phone"
                            type        = "number"
                            variant     = "outlined"
                            name        = "phone"
                            onChange    = {onChangeInput}
                            label       = {values.errPhone ? "Phone incorrect format!" : "Phone"}
                        />
                    </div>
                    <div className="form-group d-flex flex-column">
                        <TextField
                            error       = { values.errCarNumber ? true : false }
                            type        = "search"
                            variant     = "outlined"
                            name        = "carnumber"
                            onChange    = { onChangeInput }
                            label       = {values.errCarNumber ? "Car number  incorrect format!  Example : '43H1-43136' " : "Car Number. Example : '43H1-43136'"}
                        />
                    </div>
                    <div className="form-group d-flex flex-column">
                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-age-native-simple">Category Car</InputLabel>
                            <Select
                                native
                                value       = { values.category_car   }
                                onChange    = {onChangeInput}
                                name        = "category_car"
                                label="Category Car"
                                
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
                            <InputLabel htmlFor="outlined-age-native-simple">Trip From</InputLabel>
                            <Select
                                native
                                value       = {values.from}
                                onChange    = {onChangeInput}
                                name        = "from"
                                label       = "tripFrom"
                              
                            >
                                <option aria-label="None" value="" />
                                {
                                    trips.map((value, key)=> {
                                    return <option value={value.Trips_Start} key = {key}>{ value.Trips_Start }</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-age-native-simple">Trips To</InputLabel>
                            <Select
                                native
                                value           = {values.to}
                                onChange        = {onChangeInput}
                                name            = "to"
                                label           = "tripTo"
                               
                            >
                                <option aria-label="None" value="" />
                                {
                                    trips.map((value, key)=> {
                                    return <option value={value.Trips_Ends} key = {key}>{ value.Trips_Ends }</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <Button
                        // disabled = { values.seat && values.to && values.from && values.fare && values.name && values.phone && values.category_car  && !values.errName && !values.errPhone && !values.errCarNumber ? false :true }
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>send</Icon>}
                        onClick = { onClickButtonSend }
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}