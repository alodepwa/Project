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
    iconDelete : {
        color : 'red'
    }
}));

export default function LayoutListPost() {
    const classes = useStyles();
    const [idLogin, setIdLogin] = useState('');
    const [preUpdate, setPreUpdate] = useState();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Số Xe', field: 'Car_Number' },
            { title: 'Tên Xe', field: 'Passenger_Car_Name' },
            { title: 'Nội Dung', field: 'Post_Content' },
            { title: 'Tiêu Đề', field: 'Post_Title' },
            { title: 'Ghi Chú', field: 'Post_note' },
            { title: 'Trạng Thái', field: 'status_post', lookup: { 0 : 'Đang Chờ', 1: 'Xóa', 2 : 'Chấp Nhận' } },
        ],
        data: [],
    });
    const [values, setValues] = useState({
        modal: false,
        title       : '',
        content     : '',
        note        : '',
        car         : ''
    });
    
    /**
     * get list car by id
     */
    const fetchListPosts = (async () => {
        let parent_id = JSON.parse(sessionStorage.getItem('tokens')).Parent_id ? JSON.parse(sessionStorage.getItem('tokens')).Parent_id : JSON.parse(sessionStorage.getItem('tokens')).Admin_ID;
        let role_id = JSON.parse(sessionStorage.getItem('tokens')).Roles_Id;
        await axios.post(`${common.HOST}admin/get-list-post`, { parent: parent_id, role: role_id })
            .then(res => { res.data ? setState({ ...state, data: res.data }) : null })
            .catch(err => { throw err; })

    });
    /**
     * when click button update
     */
    const onClickButtonSend = useCallback(
        async (event) => {
            event.preventDefault();
            let data = {
                id_post : preUpdate.Post_Id,
                title   : values.title,
                content : values.content,
                note    : values.note
            }
            let dataBefo        = [...state.data];
            let dataJustChange  = {
                ...preUpdate,
                Post_Content    : values.content,
                Post_Title      : values.title,
                Post_note       : values.note
            };
            dataBefo[dataBefo.indexOf(preUpdate)] = dataJustChange;
            await axios.post(`${common.HOST}admin/update-post`, data)
                .then(res => {
                    setValues({ ...values, modal: false }),
                    res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Cập nhật thất bại!')
                        : (
                            setState({...state, data : dataBefo}),
                            CommonAlert.showAlert('success', 'Cập nhật thành công!')
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
            title       : data.Post_Title,
            content     : data.Post_Content,
            note        : data.Post_note,
            car         : `${data.Car_Number} - ${data.Passenger_Car_Name}`
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
    const onClickButtonApprove = ((event, data) => {
        event.preventDefault();
        Swal.fire({
            title: 'Bán Có Chấp Nhận Bài Viết?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Chấp Nhận Ngay!'
        }).then(async (result) => {
            if (result.value) {
                let dataJustChange = {
                    ...data,
                    status_post : 2
                };
                let dataPre = [...state.data];
                dataPre[dataPre.indexOf(data)] = dataJustChange;

                await axios.get(`${common.HOST}admin/approve-post/${ data.Post_Id}`)
                    .then(res => {
                        setValues({...values, modal : false}),
                        res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Thất bại!')
                            : (
                                setState({ ...state, data: dataPre }),
                                CommonAlert.showAlert('success', 'Thành công!')
                            )
                    })
                    .catch(err => { throw err; })
            }
        })
    });
    const onClickButtonReject = ((event,data)=>{
        Swal.fire({
            title: 'Bạn Muốn Từ Chối?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Xóa Ngay!'
        }).then(async (result) => {
            if (result.value) {
                let dataJustChange = {
                    ...data,
                    status_post : 1
                };
                let dataPre = [...state.data];
                dataPre[dataPre.indexOf(data)] = dataJustChange;

                await axios.delete(`${common.HOST}admin/reJectPost/${ data.Post_Id}`)
                    .then(res => {
                        setValues({...values, modal : false}),
                        res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Thất bại!')
                            : (
                                setState({ ...state, data: dataPre }),
                                CommonAlert.showAlert('success', 'Thành công!')
                            )
                    })
                    .catch(err => { throw err; })
            }
        })
    })
    /**
     * when click button delete
     */
    const onClickButtonDelete = ((event, data) => {
        event.preventDefault();
        Swal.fire({
            title: 'Bạn Muốn Xóa?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Xóa Ngay!'
        }).then(async (result) => {
            if (result.value) {
                let dataJustChange = {
                    ...data,
                    status_post : 1
                };
                let dataPre = [...state.data];
                dataPre[dataPre.indexOf(data)] = dataJustChange;

                await axios.delete(`${common.HOST}admin/delete-post/${ data.Post_Id}`)
                    .then(res => {
                        setValues({...values, modal : false}),
                        res.data[0].result === 'false' ? CommonAlert.showAlert('error', 'Xóa thất bại!')
                            : (
                                setState({ ...state, data: dataPre }),
                                CommonAlert.showAlert('success', 'Thành công!')
                            )
                    })
                    .catch(err => { throw err; })
            }
        })
    })
    const onChangeInput = (event) => {
        event.preventDefault();
        let { value } = event.target;
        setValues({ ...values, [event.target.name]: value });
    }
    /**
     * useEffect
     */
    useEffect(() => {
        fetchListPosts();
        let role_id_login = JSON.parse(sessionStorage.getItem('tokens')).Roles_Id;
        setIdLogin(role_id_login);
    }, [])


    return (
        <div className="container-fluid">
            <MaterialTable
                title="Danh Sách Bài Viết"
                columns={state.columns}
                data={state.data}
                actions={[
                    rowData => (idLogin != '1' && rowData.status_post == 0) ? {
                        icon: 'edit',
                        tooltip: 'Cập Nhật',
                        iconProps: { style: { color: "#007bff" } },
                        onClick: (event, rowData) => {
                            onClickButtonUpdate(event, rowData)
                        }
                    } : null,
                    rowData => ((idLogin != '1' && rowData.status_post == 0) ? {
                        icon: 'delete',
                        tooltip: 'Xóa',
                        iconProps: { style: { color: "red" } },
                        onClick: (event, rowData) => {
                            onClickButtonDelete(event, rowData);
                        }
                    } : null)
                    ,
                    rowData => ((idLogin == '1' && (rowData.status_post == 0 || rowData.status_post == 2) ) ? {
                        icon: 'clear',
                        tooltip: 'Từ Chối',
                        iconProps: { style: { color: "red" } },
                        onClick: (event, rowData) => {
                            onClickButtonReject(event, rowData);
                        }
                    } : null)
                    ,
                    rowData => ((idLogin == '1' && rowData.status_post == 0) ? {
                        icon: 'check',
                        tooltip: 'Chấp Nhận',
                        iconProps: { style: { color: "#007bff" } },
                        onClick: (event, rowData) => {
                            onClickButtonApprove(event, rowData);
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
                            <h4 id="transition-modal-title">Cập Nhật</h4>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">

                                      
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            label="Tên Xe"
                                            type="text"
                                            disabled
                                            value = {values.car}
                                            variant="outlined"
                                            name="note"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            // error       = { values.errName ? true : false }
                                            type="search"
                                            variant="outlined"
                                            name="title"
                                            value = {values.title}
                                            label={values.errName ? "Tiêu đề không đúng định dạng!" : "Tiêu Đề *"}
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            label="Nội Dung * "
                                            type="text"
                                            value = {values.content}
                                            variant="outlined"
                                            name="content"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group d-flex flex-column">
                                        <TextField
                                            label="Ghi Chú"
                                            type="text"
                                            variant="outlined"
                                            value = {values.note}
                                            name="note"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <Button
                                        disabled={values.title && values.content && values.car ? false : true}
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
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>

        </div>
    )
}
