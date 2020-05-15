import React, { useState, useEffect } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import md5 from 'md5';
import axios from 'axios';
import * as common from './../../common';
import Swal from 'sweetalert2';
import { Redirect,useHistory  } from 'react-router-dom';

export default function LayoutLogin() {
    const [values, setValues] = useState({ password : '', phone : '', errPassword : '', errPhone : '', err : '' });
    let history = useHistory();
    /**
     * set state when input change
     */
    const onChangeInput = (event) => {
        event.preventDefault();
        let  { value } = event.target;
        if(event.target.name == "phone"){
            let parrtenPhone = /^[0][1-9][0-9]{7,9}$/;
            let errPhone = 'Phone isn\'t correctly!'
            parrtenPhone.test(value) ? setValues({ ...values, [event.target.name] : value, errPhone : '' }) : setValues({ ...values, errPhone, err : '' });
        }
        if(event.target.name == "password"){
            let { value } = event.target;
            setValues({ ...values, [event.target.name] : md5(value)});
        }
    }
    /**
     * on submit login
     */
    const onClickButtonLogin = (event) => {
        event.preventDefault();
        let data = { password : values.password, phone : values.phone };
        axios.post(`${common.HOST}admin/login`, data)
        .then(res => {
            res.data.length > 0 ? 
            (
                sessionStorage.setItem('tokens', JSON.stringify(res.data[0])),
                sessionStorage.setItem('isLogin', true),
                setValues({...values, err : '' }),
                history.push('/admin')
            )
             : 
                setValues({ ...values, errPhone : '', errPassword : '', err : 'Sai tài khoản hoặc mật khẩu!'}) ; 
        })
        .catch( err => { throw err })
    }
    useEffect(()=>{
        sessionStorage.setItem('tokens','');
        sessionStorage.setItem('isLogin', false);
    }, [])
    return (
        <div className="layout-login">
                <div className="container form-login">
                    <div className="card">
                        <div className="card-body">
                        <div className="row bg-light">
                            <div className="col-lg-6">
                                <div className="">
                                    <img className="card-img" src="https://dailysg.vn/wp-content/uploads/2017/10/DailySG.vn-xe-khach-29-34-cho-samco-isuzu-1.png"></img>
                                </div>
                            </div>
                            <div className="col-lg-6 row">
                                <div  className="col-lg-12">
                                    <div className="d-flex flex-column">
                                        <div className="text-center">
<<<<<<< HEAD
                                            <h1 className="h4 text-gray-900 my-4">Chào Mừng Bạn</h1>
=======
                                            <h1 className="h4 text-gray-900 my-4">Welcome User</h1>
>>>>>>> tantoan push master first times
                                        </div>
                                        <form >
                                            <div className="form-group">
                                                <label style={{color : 'red'}}>{ values.err ? values.err : values.errPhone ? values.errPhone : '' }</label>
                                                <TextField className="form-control bg-light"
<<<<<<< HEAD
                                                    label="Số Điện Thoại..."
=======
                                                    label="Phone number..."
>>>>>>> tantoan push master first times
                                                    type = 'number'
                                                    name = 'phone'
                                                    InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                    }}
                                                    onChange = { onChangeInput }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextField className="form-control bg-light"
<<<<<<< HEAD
                                                    label="Mật Khẩu..."
=======
                                                    label="Your password..."
>>>>>>> tantoan push master first times
                                                    name = 'password'
                                                    type = 'password'
                                                    onChange = { onChangeInput }
                                                    InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                    }}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button 
                                                    type="submit"  
                                                    className="btn btn-primary"
                                                    disabled = { values.password && values.phone && !values.errPhone && !values.errPassword ? false : true }
                                                    // style = {{  values.password &&  }}
                                                    onClick = { onClickButtonLogin }
<<<<<<< HEAD
                                                >Đăng Nhập</button>
                                                <a href="#">Quên Mật Khẩu!</a>
=======
                                                >Login</button>
                                                <a href="#">Forgot PassWord!</a>
>>>>>>> tantoan push master first times
                                            </div>

                                        </form>
                                        </div>
                                </div>
                                
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

