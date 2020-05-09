import React, { useState, useEffect } from 'react';
import * as common from './../../common';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import * as CommonAlert from './../Common/ShowAlert';
import md5 from 'md5';
export default function LayoutProfile() {
    const [ isClick, setIsClick ] = useState(false);
    const [values, setValues] = useState({
        phone       : '',
        name        : '',
        sex         : "1",
        address     : '',
        admin_id    : '',
        role_id     : '',
        dateOffBirth: moment(new Date()).format('YYYY-MM-DD'),
        errName     : '',
        errPhone    : '',
        errAddress  : '',
        errDate     : '',
        password    : '',
        role_chuc_vu: ''
        
    });
    const fetchDataUser = async () => {
        let id = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        await axios.get(`${common.HOST}admin/get-myprofile/${id}`)
            .then(res => { res.data ? setValues({ ...values, name :  res.data[0].Admin_Name, phone :  res.data[0].Admin_Phone, sex : res.data[0].Admin_Sex, address : res.data[0].Admin_Address, dateOffBirth :  moment(res.data[0].Admin_Dateofbirth).format('YYYY-MM-DD'), admin_id :  res.data[0].Admin_ID, role_chuc_vu :res.data[0].Role_Chuc_vu }) : null })
            .catch(err => { throw err; })
    }

    const onChangeInput = (event) => {
        event.preventDefault();
         let { value } = event.target;
        // if (event.target.name == "phone") {
        //     let parrtenPhone = /^[0][1-9][0-9]{7,9}$/;
        //     let errPhone = 'Phone isn\'t correctly!'
        //     parrtenPhone.test(value) ? setValues({ ...values, [event.target.name]: value, errPhone: '' }) : setValues({ ...values, errPhone, err: '' });
        // }
        // if (event.target.name == "name") {
        //     let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><]*$/;
        //     let errName = 'Name isn\'t correctly format!';
        //     parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errName: '' }) : setValues({ ...values, errName, err: '' });

        // }
        // if (event.target.name == "address") {
        //     let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><0-9]*$/;
        //     let errAddress = 'Address isn\'t correct format!';
        //     parrtenText.test(value) ? setValues({ ...values, [event.target.name] : value, errAddress: '' }) : setValues({ ...values, errAddress, err: '' });
        // }
        // else{
            setValues({...values, [event.target.name] : value })
        // }
    }

    const handleChange = (event => {
        event.preventDefault();
        let { value } = event.target;
        setValues({ ...values, [event.target.name]: value })
    })
    const handleDateChange = (date => {
        let date_format = moment(date).format('YYYY-MM-DD');
        setValues({ ...values, dateOffBirth: date_format });
    })
    
    const onClickButtonSend =
        async () => {
            let id = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
            let data = {
                id              : values.admin_id,
                name            : values.name,
                phone           : values.phone,
                address         : values.address,
                dateOffBirth    : values.dateOffBirth,
                sex             : values.sex,
                password        : md5(values.phone)
            };
           await axios.post(`${common.HOST}admin/update-profile`, data)
                .then( res => {
                    res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Create fail!') : CommonAlert.showAlert('success', 'Create success!')
                })
                .catch(err => { throw err });
        }
    
    useEffect(() => {
        fetchDataUser();
    }, [])

    return (
        <div className="row profile justify-content-center">
            <div className="col-xs-12 col-sm-10 col-md-9 col-lg-5 text-center">
                <div className="profile-sidebar">
                    {/* SIDEBAR USERPIC */}
                    <div className="profile-userpic">
                        <img src="https://cdn4.iconfinder.com/data/icons/people-std-pack/512/boss-512.png" className="img-responsive" alt="" />
                    </div>
                    {/* END SIDEBAR USERPIC */}
                    {/* SIDEBAR USER TITLE */}
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {values.name ? values.name : 'name'}
                        </div>
                        <div className="profile-usertitle-job">
                            {values.role_chuc_vu ? values.role_chuc_vu  : 'chuc vu'}
                        </div>
                    </div>

                    <div className="container">
                        <div className="form-group d-flex flex-column">
                            <TextField
                                error={values.errName ? true : false}
                                type="text"
                                name="name"
                                value = { values.name ? values.name : '' }
                                label={values.errName ? "Name  incorrect format! " : 'Name'}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="form-group d-flex flex-column">
                            <TextField
                                error={values.errAddress ? true : false}
                                type="text"
                                name="address"
                                value = { values.address }
                                onChange={onChangeInput}
                                label={values.errAddress ? "Address  incorrect format! " : 'Address'}
                            />
                        </div>
                        <div className="form-group d-flex flex-column">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    // disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date Off Birth"
                                    value={values.dateOffBirth ? values.dateOffBirth : new date() }
                                    onChange={handleDateChange}

                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="form-group d-flex flex-column">
                            <TextField
                                error={values.errPhone ? true : false}
                                type="number"
                                name="phone"
                                onChange={onChangeInput}
                                value = { values.phone }
                                label={values.errPhone ? "Phone  incorrect format! " : 'Phone'}
                            />
                        </div>
                        <div className="form-group d-flex flex-column">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Sex</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    className="d-flex flex-row"
                                    name="sex"
                                    value={values.sex}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Female" />
                                    <FormControlLabel value="0" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="form-group d-flex flex-column">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange    = { ()=>{setIsClick(!isClick)} }
                                        name        = "checkedB"
                                        color       = "primary"
                                    />
                                }
                                label="Change password."
                            />
                        </div>
                        {
                            isClick ? (
                                <div className="form-group d-flex flex-column">
                                    <TextField
                                        error={values.errAddress ? true : false}
                                        type="password"
                                        name="password"
                                        value = {values.password}
                                        onChange={onChangeInput}
                                        label={values.errAddress ? "Password  incorrect format! " : 'Password'}
                                    />
                                </div>
                            ) : null
                        }
                        
                        <Button
                            disabled={ values.sex && values.address && values.dateOffBirth && values.name && values.phone && !values.errName && !values.errPhone && !values.errAddress ? false : true}
                            variant="contained"
                            color="primary"
                            endIcon={<Icon>send</Icon>}
                            onClick={onClickButtonSend}
                        >
                            Save
                                </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
