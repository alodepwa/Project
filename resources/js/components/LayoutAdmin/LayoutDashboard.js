import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
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
    const [state, setState] = React.useState({
        columns: [
            { title: 'Số Xe', field: 'Car_Number' },
            { title: 'Tên Xe', field: 'Passenger_Car_Name' },
            { title: 'Giá Vé', field: 'Passenger_Car_fare' },
            { title: 'Số Ghế', field: 'Passenger_Car_Seats' },
            { title: 'Kiểu Xe', field: 'Category_Style' },
            { title: 'Tầng', field: 'Category_Floor' },
           
        ],
        data: [],
    });
    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <Card className={classes.root} style={{background:'#0061f2'}}>
                        <CardContent>
                            <Typography variant="h6">
                                Thống kê hành trình trong 1 ngày
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ flex: 'right' }}>Chi tiết</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <Card className={classes.root} style={{background:'#f4a100'}}>
                        <CardContent>
                            <Typography variant="h6">
                                Thống kê số ghế chưa đặt của xe trong ngày.
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ flex: 'right' }}>Chi tiết</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <Card className={classes.root} style={{background:'#00ac69'}}>
                        <CardContent>
                            <Typography variant="h6">
                                Thống kê số ghế chưa đặt của xe trong ngày.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ flex: 'right' }}>Chi tiết</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
            <div className="mt-5">
                <MaterialTable
                    title="List Cars"
                    columns={state.columns}
                    data={state.data}
                />
            </div>
        </div>
    )
}
