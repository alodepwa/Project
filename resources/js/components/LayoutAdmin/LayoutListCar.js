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

export default function LayoutListUsers() {
    const classes                           = useStyles();
    const [idLogin, setIdLogin]             = useState('');
    const [trips, setTrips ]                = useState([]);
    const [categoryCar, setCategoryCar ]    = useState([]);
    const [preUpdate, setPreUpdate ] = useState();
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
            { title: 'Created At', field: 'created_at'},
            { title: 'Created By', field: 'created_by' },
            { title: 'Updated At', field: 'updated_at' },
            { title: 'Updated By', field: 'updated_by' },
            { title: 'Deleted At', field: 'deleted_at' },
            { title: 'Deleted By', field: 'deleted_by' }
        ],
        data: [],
    });
    const [values, setValues] = useState({
        modal: false,
        id              : '',
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
    /**
     * get list car by id
     */
    const fetchListCar = (async () => {
        let parent_id = JSON.parse(sessionStorage.getItem('tokens')).Parent_id ? JSON.parse(sessionStorage.getItem('tokens')).Parent_id : JSON.parse(sessionStorage.getItem('tokens')).Admin_ID ;
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
                id_car              : preUpdate.Passenger_Car_Id,
                id_trip             : preUpdate.Trips_ID,
                Car_Number          : values.carnumber,
                Passenger_Car_Name  : values.name,
                phone               : values.phone,
                Passenger_Car_fare  : values.fare,
                Passenger_Car_Seats : values.seat,
                admin_id            : id,
                category_car        : values.category_car,
                name_admin          : updated_by,
                Trips_Start         : values.from,
                Trips_Ends          : values.to
            };
            let data1 = {
                ...preUpdate,
                phone               : values.phone,
                category_car        : values.category_car,
                Trips_Ends          : values.to,
                Trips_Start         : values.from,
                updated_by          : updated_by,
                Car_Number          : values.carnumber,
                Passenger_Car_Name  : values.name,
                Passenger_Car_fare  : values.fare,
                Passenger_Car_Seats : values.seat,
                updated_at          : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            }
            let data_pre_update = preUpdate;
            const dataPre = [...state.data];
            dataPre[dataPre.indexOf(data_pre_update)] = data1;
            await axios.post(`${common.HOST}admin/update-car`, data)
                .then(res => {
                    res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Create fail!')
                        : (
                            setValues({ ...values, modal: false }),
                            setState({ ...state, data: dataPre }),
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
        setValues({
            ...values,
            modal: true,
            id              : data.Passenger_Car_Id,
            name            : data.Passenger_Car_Name,
            seat            : data.Passenger_Car_Seats,
            fare            : data.Passenger_Car_fare,
            carnumber       : data.Car_Number,
            phone           : data.phone,
            category_car    : data.Category_Id,
            from            : data.Trips_Start,
            to              : data.Trips_Ends,
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
            id           : id,
            user_deleted : name_admin
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
                    car_status : 1,
                    deleted_by : name_admin,
                    deleted_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
                };
                let dataPre             = [...state.data];
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
            let parrtenText = /^[0-9]{1,2}[A-Z][0-9][-][0-9]{3,5}$/
            let errCarNumber = 'Car number isn\'t correct format!';
            parrtenText.test(value) ? setValues({ ...values, [event.target.name]: value, errCarNumber: '' }) : setValues({ ...values, errCarNumber, err : '' });
        }
        else{
            setValues({ ...values, [event.target.name] : event.target.value });
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
        <div className="container">
            <MaterialTable
                title="List Cars"
                columns={state.columns}
                data={state.data}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Update Car',
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData)
                        }
                    },
                    rowData => ((idLogin == '2' && rowData.car_status == 0 ) ? {
                        icon: 'delete',
                        tooltip: 'Delete Car',
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
                            <h4 id="transition-modal-title">Update Car</h4>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            error={values.errName ? true : false}
                                            label="Car name"
                                            type="search"
                                            variant="outlined"
                                            name="name"
                                            value = {values.name}
                                            label={values.errName ? "Car Name incorrect format!" : "Car Name"}
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            label="Car fare"
                                            type="number"
                                            value = {values.fare}
                                            step={1}
                                            variant="outlined"
                                            name="fare"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            label="Car seats"
                                            type="number"
                                            value = {values.seat}
                                            variant="outlined"
                                            name="seat"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            error={values.errPhone ? true : false}
                                            label="Phone"
                                            type="number"
                                            variant="outlined"
                                            name="phone"
                                            value = {values.phone}
                                            onChange={onChangeInput}
                                            label={values.errPhone ? "Phone incorrect format!" : "Phone"}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            error={values.errCarNumber ? true : false}
                                            type="text"
                                            variant="outlined"
                                            name="carnumber"
                                            value = {values.carnumber}
                                            onChange = {onChangeInput}
                                            label={values.errCarNumber ? "Car number  incorrect format!  Example : '43H1-43136' " : "Car Number. Example : '43H1-43136'"}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <FormControl variant="outlined" >
                                            <InputLabel htmlFor="outlined-age-native-simple">Category Car</InputLabel>
                                            <Select
                                                native
                                                value={values.category_car}
                                                onChange={onChangeInput}
                                                name="category_car"
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
                                                value={values.from}
                                                onChange={onChangeInput}
                                                name="from"
                                                label="tripFrom"

                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    trips.map((value, key) => {
                                                        return <option value={value.Trips_Start} key={key}>{value.Trips_Start}</option>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="outlined" >
                                            <InputLabel htmlFor="outlined-age-native-simple">Trips To</InputLabel>
                                            <Select
                                                native
                                                value={values.to}
                                                onChange={onChangeInput}
                                                name="to"
                                                label="tripTo"

                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    trips.map((value, key) => {
                                                        return <option value={value.Trips_Ends} key={key}>{value.Trips_Ends}</option>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <Button
                                        disabled = { values.seat && values.to && values.from && values.fare && values.name && values.phone && values.category_car  && !values.errName && !values.errPhone && !values.errCarNumber ? false :true }
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
