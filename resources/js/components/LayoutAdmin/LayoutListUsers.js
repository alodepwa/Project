import React, { useEffect, useState, useCallback } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import * as common from './../../common';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
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
import moment from 'moment';
import * as CommonAlert from './../Common/ShowAlert';
import Swal from 'sweetalert2';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
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

export default function LayoutListUsers() {
    const classes = useStyles();
    const [idLogin, setIdLogin] = useState('');
    const [preUpdate, setPreUpdate ] = useState();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Address', field: 'address' },
            { title: 'Date Off Birth', field: 'birthYear' },
            { title: 'Phone', field: 'phone' },
            {
                title: 'Gender',
                field: 'gender',
                lookup: { 1: 'Female', 0: 'Male' },
            },
            { title: 'Role', field: 'role' },
        ],
        data: [],
    });
    const [values, setValues] = useState({
        modal           : false,
        role            : [],
        phone           : '',
        name            : '',
        sex             : "1",
        address         : '',
        role_id         : '',
        dateOffBirth    : moment(new Date()).format('YYYY-MM-DD'),
        errName         : '',
        errPhone        : '',
        errAddress      : '',
        role_id_login   : null
    });
    const fetchListUsers = (async () => {
        let parent_id = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        await axios.get(`${common.HOST}admin/get-list-user/${parent_id}`)
            .then(res => { res.data ? setState({ ...state, data: res.data }) : null })
            .catch(err => { throw err; })
       
    });
    /**
     * when click button update
     */
    const onClickButtonSend = useCallback(
        async () => {
            let id = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
            let data = {
                name            : values.name,
                phone           : values.phone,
                address         : values.address,
                dateOffBirth    : values.dateOffBirth,
                sex             : values.sex,
                role            : values.role_id,
                id
            };
            let data1 = {
                id              : preUpdate.id,
                name            : values.name,
                phone           : values.phone,
                address         : values.address,
                birthYear       : values.dateOffBirth,
                role_id         : values.sex,
                role            : preUpdate.role,
                gender          : values.sex,
                Parent_id       : preUpdate.Parent_id
            };
            let data_pre_update = preUpdate;
            const dataPre = [...state.data];
            dataPre[dataPre.indexOf(data_pre_update)] = data1;
           
           await axios.post(`${common.HOST}admin/update-user`, data)
                .then( res => {
                    res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Create fail!') 
                    : (   
                        setValues({...values, modal : false}),
                        setState({...state , data : dataPre}),
                        CommonAlert.showAlert('success', 'Create success!') 
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
        let id = data.id;
        setValues({
            ...values,
            modal   : true, 
            name    : data.name,
            phone   : data.phone,
            sex     : data.gender,
            address : data.address,
            role_id : data.role_id,
            dateOffBirth :  moment(data.birthYear).format('YYYY-MM-DD')
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
    async function fetchRole(){ 
        await axios.get(`${common.HOST}admin/get-role`)
                .then( role => {
                    role.data ? setValues({...values, role : role.data}) : null 
                } )
                .catch(e => { throw err;})
    };
    /**
     * set state when change input name, address, phone
     */
    const onChangeInput = (event) => {
        event.preventDefault();
        let { value } = event.target;
        if (event.target.name == "phone") {
            let parrtenPhone = /^[0][1-9][0-9]{7,9}$/;
            let errPhone = 'Phone isn\'t correctly!'
            parrtenPhone.test(value) ? setValues({ ...values, [event.target.name]: value, errPhone: '' }) : setValues({ ...values, errPhone, err: '' });
        }
        if (event.target.name == "name") {
            let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><0-9]*$/;
            let errName = 'Name isn\'t correctly format!';
            parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errName: '' }) : setValues({ ...values, errName, err: '' });

        }
        if (event.target.name == "address") {
            let parrtenText = /^[^!~`@#@\$%^&\*()\+_\-=\\|}{}\]\["';?\/><]*$/;
            let errAddress = 'Address isn\'t correct format!';
            parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errAddress: '' }) : setValues({ ...values, errAddress, err: '' });
        }
    }
    /**
     * set state when change input sex and input role
     */
    const handleChange = (event => {
        event.preventDefault();
        let { value } = event.target;
        setValues({...values, [event.target.name] : value})
    })
    /**
     * set state when change input date
     */
    const handleDateChange = (date => {
        let date_format = moment(date).format('YYYY-MM-DD');
        setValues({...values, dateOffBirth : date_format});
    })

    /**
     * when click button delete
     */
    const onClickButtonDelete = ((event, data) => {
        event.preventDefault();
        Swal.fire({
            title: 'Are you Delete?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.value) {
                let id = data.id;
                let dataPre = [...state.data];
                let index = dataPre.indexOf(data);
                dataPre.splice(index, 1);
                
                await axios.delete(`${common.HOST}admin/delete-user/${id}`)
                .then(res => {
                    res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Delete fail!') 
                    : (   
                        setState({...state, data : dataPre}),
                        CommonAlert.showAlert('success', 'Create success!') 
                    )
                })
                .catch(err => { throw err;})

            }
          })
    })

    /**
     * useEffect
     */
    useEffect(() => {
        fetchListUsers();
        fetchRole();
        let role_id_login = JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        setIdLogin(role_id_login);
    }, [])


    return (
        <div className="container">
            <MaterialTable
                title="List Users"
                columns={state.columns}
                data={state.data}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Update User',
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData)
                        }
                    },
                    rowData => ( (idLogin == rowData.Parent_id) ? {
                        icon: 'delete',
                        tooltip: 'Delete User',
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
                            <h4 id="transition-modal-title">Update Users</h4>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            error={values.errName ? true : false}
                                            type="text"
                                            name="name"
                                            value = { values.name }
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
                                                label="Date picker inline"
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
                                            value = { values.phone }
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
                                    <div className="form-group d-flex flex-column">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="role_id"
                                            value={values.role_id}
                                            onChange={handleChange}
                                        >
                                            {
                                                values.role.map((role, key) => {
                                                    return <MenuItem value={role.Roles_Id} key={key} >{role.Role_Chuc_vu}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <Button
                                        disabled={values.role_id && values.sex && values.address && values.dateOffBirth && values.name && values.phone && !values.errName && !values.errPhone && !values.errAddress ? false : true}
                                        variant="contained"
                                        color="primary"
                                        endIcon={<Icon>send</Icon>}
                                        onClick={onClickButtonSend}
                                    >
                                        Update
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
