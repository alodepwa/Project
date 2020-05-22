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
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        background: 'none !important',
        margin : '25px 0px'
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
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 formLogin mt-5">
                            <div className="d-flex flex-column">
                                <div className="title text-center mb-5"><h2>Vé Xe 2020</h2></div>
                                
                                {
                                    values.err && <div className="text-center pb-3" style={{color : 'red'}}>{values.err}</div>
                                }
                                <TextField
                                    error={values.errPhone ? true : false}
                                    type='number'
                                    name='phone'
                                    label={!values.errPhone ? 'Số điện thoại ' : 'Sai định dạng'}
                                    variant="outlined"
                                    onChange={onChangeInput}
                                />
                                <TextField
                                    error={values.errPhone ? true : false}
                                    type='password'
                                    name='password'
                                    label='Mật khẩu'
                                    variant="outlined"
                                    onChange={onChangeInput}
                                    className = { classes.root}
                                />
                                 <div className="form-group text-right">
                                    <a link="#" style={{color : '#0268b9'}}>Forget Password?</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btnLogin"
                                        disabled={values.password && values.phone && !values.errPhone && !values.errPassword ? false : true}
                                        onClick={onClickButtonLogin}
                                    >Đăng Nhập</button>
                                </div>
                                <div className="bottom-title text-center">New User? <a style={{color : '#0268b9'}}>Sign up for a new account.</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

