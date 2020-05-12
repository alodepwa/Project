import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
class LayoutInfoTicketFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toLocation: '',
            fromLocation: '',
            carsName: [],
            nameCar: 'default',
            end     : [],
            start   : []
        }
        this.onChangeCarName = this.onChangeCarName.bind(this);
    }
    onChangeCarName(e) {
        e.preventDefault();
        console.log(e.target.value)
    }
    componentWillReceiveProps(props) {
        if (props.from && props.to) {
            this.setState({
                toLocation: props.to,
                fromLocation: props.from,
            })
        }
    }

    componentDidMount() {
        if (this.props.info_location.length == 0) {
            axios.get('http://127.0.0.1:8000/api/home').then(res => {
                if (res.data) {
                    this.setState({ start: res.data['start'], end : res.data['end'] });
                }
            }).catch(err => { throw err });
        } else {
            this.setState({
                end     : this.props.info_location['end'],
                start   : this.props.info_location['start'],
            })
        }

        axios.get('http://127.0.0.1:8000/api/home/get-name-cars').then(res => {
            if (res.data) {
                this.setState({ carsName: res.data });
            }
        }).catch(err => { throw err });

    }
    render() {
        return (
            <div >
                <div className="d-flex justify-content-between">
                    <p className="nav-link"><strong>Bộ lọc tìm kiếm</strong></p>
                    <a className="nav-link" href="#"><small>Xóa lọc</small></a>
                </div>
                <div className="card">
                    <div className="card-body">
                        <form className="row" >
                            <div className="col-12">
                                <div className="form-group">
                                    <FormControl className="from">
                                        <InputLabel >Nhà Xe</InputLabel>
                                        <Select
                                            native
                                            value={this.state.nameCar}
                                            onChange={(e) => this.onChangeCarName(e)}
                                        // inputProps={{
                                        //     name: 'age',
                                        //     id: 'age-native-simple',
                                        // }}
                                        >
                                            <option value=''></option>
                                            <option aria-label="None" value="default">Chọn nhà xe</option>
                                            {this.state.carsName.map((value, key) => <option key={key} value={value.Passenger_Car_Id}>{value.Passenger_Car_Name}</option>)}

                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <FormControl className="from">
                                        <Select
                                            native
                                            value={this.state.fromLocation}
                                            // onChange=""
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-native-simple',
                                            }}
                                        >
                                            <option value=''></option>
                                            {this.state.start.map((value, key) => {
                                                return (
                                                    <option value={value.Trips_Start} key={key}>{value.Trips_Start}</option>
                                                )
                                            })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <FormControl className="from">
                                        <Select
                                            native
                                            value={ this.state.toLocation }
                                        // onChange=""
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-native-simple',
                                        }}
                                        >
                                            <option value=''></option>
                                            {this.state.end.map((value, key) => {
                                                return (
                                                    <option value={value.Trips_Ends} key={key}>{value.Trips_Ends}</option>
                                                )
                                            })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <p className="col-lg-12"><strong>Thông tin mới.</strong></p>
                            <div className="col-12 ">
                                <div className="form-group  text-muted">
                                    <img className="imageFilter" src="https://static.vexere.com/blog/uploads/2019/12/zalopay-tet2020-752x400.png" alt="" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group text-muted">
                                    <img className="imageFilter" src="https://static.vexere.com/blog/uploads/2020/03/banner-corona.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group text-muted">
                                    <img className="imageFilter" src="https://static.vexere.com/blog/uploads/2020/05/be1.png" alt="" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group text-muted">
                                    <img className="imageFilter" src="https://static.vexere.com/blog/uploads/2020/05/discount.jpg" alt="" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        info_location: state.User.info_location
    };
}
export default connect(mapStateToProps, null)(LayoutInfoTicketFilter);
