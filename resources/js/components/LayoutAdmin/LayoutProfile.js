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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import * as CommonAlert from './../Common/ShowAlert';
import md5 from 'md5';
export default function LayoutProfile() {
    const [state, setState] = useState({
        data : []
    });
    const [values, setValues] = useState({
        phone: '',
        name: '',
        sex: "1",
        address: '',
        role   : [],
        role_id: '',
        dateOffBirth: moment(new Date()).format('YYYY-MM-DD'),
        errName: '',
        errPhone: '',
        errAddress: '',
        errDate: '',
    });
    const fetchDataUser = async () => {
        let id = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        await axios.get(`${common.HOST}admin/get-myprofile/${id}`)
            .then(res => { res.data ? setState({ ...state, data: res.data }) : null })
            .catch(err => { throw err; })
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
        if (event.target.name == "address") {
            let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><0-9]*$/;
            let errAddress = 'Address isn\'t correct format!';
            parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errAddress: '' }) : setValues({ ...values, errAddress, err: '' });
        }
    }

    const handleChange = (event => {
        event.preventDefault();
        let { value } = event.target;
        setValues({...values, [event.target.name] : value})
    })
    const handleDateChange = (date => {
        let date_format = moment(date).format('YYYY-MM-DD');
        setValues({...values, dateOffBirth : date_format});
    })

    useEffect(() => {
        fetchDataUser();
    }, [])

    return (
        <div className="row profile">
            <div className="col-md-6">
                <div className="profile-sidebar">
                    {/* SIDEBAR USERPIC */}
                    <div className="profile-userpic">
                        <img src="https://cdn4.iconfinder.com/data/icons/people-std-pack/512/boss-512.png" className="img-responsive" alt="" />
                    </div>
                    {/* END SIDEBAR USERPIC */}
                    {/* SIDEBAR USER TITLE */}
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {state.data[0] ? state.data[0].Admin_Name : null}
                        </div>
                        <div className="profile-usertitle-job">
                            {state.data[0] ? state.data[0].Role_Chuc_vu : null}
                        </div>
                    </div>

                        <div className="container">
                            <div className="form-group d-flex flex-column">
                                <TextField
                                    error={values.errName ? true : false}
                                    type="text"
                                    name="name"
                                label={values.errName ? "Name  incorrect format! " : 'Name'}
                                onChange={onChangeInput}
                                />
                            </div>
                            <div className="form-group d-flex flex-column">
                                <TextField
                                    error={values.errAddress ? true : false}
                                    type="text"
                                    name="address"
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
                                    value={values.dateOffBirth}
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
                            <Button
                                disabled={values.role_id && values.sex && values.address && values.dateOffBirth && values.name && values.phone && !values.errName && !values.errPhone && !values.errAddress ? false : true}
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                            // onClick={onClickButtonSend}
                            >
                                Save
                                </Button>
                        </div>

                </div>
            </div>
        </div>
    )
}
