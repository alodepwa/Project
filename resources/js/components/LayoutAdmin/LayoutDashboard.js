import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import axios from 'axios';
import * as common from './../../common';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import LayoutProfile from './LayoutProfile';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function LayoutDashboard() {
    const classes = useStyles();
    const role_id = JSON.parse(sessionStorage.getItem('tokens')).Roles_Id;
    const [check, setCheck] = useState(false);
    const [state, setState] = React.useState({
        columns: [
            { title: 'Số Xe', field: 'Car_Number' },
            { title: 'Tên Xe', field: 'Passenger_Car_Name' },
            { title: 'Chuyến Đi', field: 'trips' },
            { title: 'Doanh Thu', field: 'total' },
        ],
        columnWeeks: [
            { title: 'Số Xe', field: 'Car_Number' },
            { title: 'Tên Xe', field: 'Passenger_Car_Name' },
            { title: 'Chuyến Đi', field: 'trips' },
            { title: 'Tổng chuyến đi', field: 'numberTrips' },
        ],
        data: [],
        dataWeek: []
    });
    let admin_id = JSON.parse(sessionStorage.getItem('tokens')).Parent_id;
    const fetchDataMonth = async (admin_id) => {
        await axios.get(`${common.HOST}admin/get-profit-month/${admin_id}`).then(response => {
            response.data && setState({ ...state, data: response.data })
        }).catch(err => { throw err; })
    }

    const fetchTripsWeek = async (admin_id) => {
        await axios.get(`${common.HOST}admin/get-trips-week/${admin_id}`).then(response => {
            response.data && setState({ ...state, dataWeek: response.data })
        }).catch(err => { throw err; })
    }

    const clickFirstDetail = (e) => {
        e.preventDefault();
        setCheck(false);
        state.data.length == 0 && fetchDataMonth(admin_id);
    }
    const clickSecondDetail = (e) => {
        e.preventDefault();
        setCheck(true);
        state.dataWeek.length == 0 && fetchTripsWeek(admin_id);
    }

    useEffect(() => {
        fetchDataMonth(admin_id)
    }, []);
    var total = 0;
    var totalTrips = 0;
    state.dataWeek.map(index => {
        totalTrips = parseInt(index.numberTrips) + totalTrips;                                   
    })
    state.data.map(index => {
        let temp = parseInt(index.total.replace(/,/g, ''));
        // parseInt(temp,1);
        total = parseInt(temp) + total;
    });
    return (
        role_id != 1 ? (
            <div className="container-fluid dashboard">
                <div className="row d-flex justify-content-around">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Card className={classes.root} style={{ background: '#28a745' }}>
                            <CardContent>
                                <Typography variant="h6" className="text-color">
                                    Thống kê doanh thu nhà xe trong một tháng
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={clickFirstDetail} style={{ flex: 'right', color: '#fffffff2', fontSize: '12px' }}>Chi tiết</Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Card className={classes.root} style={{ background: '#2092ed' }}>
                            <CardContent>
                                <Typography variant="h6" className="text-color">
                                    Thống kê số chuyến đi trong một tuần.
                                </Typography>
                            </CardContent>
                            <CardActions className="d-flex flex-end">
                                <Button size="small" onClick={clickSecondDetail} style={{ flex: 'right', color: '#fffffff2', fontSize: '12px' }}>Chi tiết</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
                <div className="mt-5">
                    <MaterialTable
                        title={ check ? (
                            <div className="d-flex justify-content-between">
                                <p>
                                    Chuyến đi tháng : <b> {moment().subtract(1, 'month').format('MM-YYYY')}</b>
                                </p>
                                <p>Tổng chuyến đi : &nbsp;
                                    <b>
                                    {
                                        totalTrips
                                    }                                                   
                                    </b>
                                    chuyến đi
                                </p>
                            </div>
                        ) : (
                                <div className="d-flex justify-content-between">
                                    <p>
                                        Doanh thu tháng : <b> {moment().subtract(1, 'month').format('MM-YYYY')}</b>
                                    </p>
                                    <p>Tổng Doanh Thu : &nbsp;
                                        <b>
                                            <NumberFormat
                                                value={total}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </b> vnđ
                                    </p>
                                </div>
                            )

                        }
                        columns={check ? state.columnWeeks : state.columns}
                        data={check ? state.dataWeek : state.data}
                    />
                </div>
            </div>
        ) : (<LayoutProfile />)
    )
}
