import React, { useState, useEffect } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import md5 from 'md5';
import axios from 'axios';
import * as common from './../../common';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function LayoutLogin() {
    const classes = useStyles();
    const [values, setValues] = useState({ password: '', phone: '', errPassword: '', errPhone: '', err: '' });
    let history = useHistory();
    /**
     * set state when input change
     */
    const onChangeInput = (event) => {
        event.preventDefault();
        let { value } = event.target;
        if (event.target.name == "phone") {
            let parrtenPhone = /^[0][1-9][0-9]{7,9}$/;
            let errPhone = 'Phone isn\'t correctly!'
            parrtenPhone.test(value) ? setValues({ ...values, [event.target.name]: value, errPhone: '' }) : setValues({ ...values, errPhone, err: '' });
        }
        if (event.target.name == "password") {
            let { value } = event.target;
            setValues({ ...values, [event.target.name]: md5(value) });
        }
    }
    /**
     * on submit login
     */
    const onClickButtonLogin = (event) => {
        event.preventDefault();
        let data = { password: values.password, phone: values.phone };
        axios.post(`${common.HOST}admin/login`, data)
            .then(res => {
                res.data.length > 0 ?
                    (
                        sessionStorage.setItem('tokens', JSON.stringify(res.data[0])),
                        sessionStorage.setItem('isLogin', true),
                        setValues({ ...values, err: '' }),
                        history.push('/admin')
                    )
                    :
                    setValues({ ...values, errPhone: '', errPassword: '', err: 'Sai tài khoản hoặc mật khẩu!' });
            })
            .catch(err => { throw err })
    }
    useEffect(() => {
        sessionStorage.setItem('tokens', '');
        sessionStorage.setItem('isLogin', false);
    }, []);
    return (
        <div className="layout-login">
            <div className="container form-login">
                <div className="card-body">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 formLogin">
                            <form >
                                <div className="form-group">
                                    <label style={{ color: 'red' }}>{values.err ? values.err : values.errPhone ? values.errPhone : ''}</label>
                                    
                                    <TextField className="form-control "
                                        label="Số Điện Thoại..."
                                        type='number'
                                        name='phone'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField className="form-control"
                                        label="Mật Khẩu..."
                                        name='password'
                                        type='password'
                                        onChange={onChangeInput}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={values.password && values.phone && !values.errPhone && !values.errPassword ? false : true}
                                        // style = {{  values.password &&  }}
                                        onClick={onClickButtonLogin}
                                    >Đăng Nhập</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

