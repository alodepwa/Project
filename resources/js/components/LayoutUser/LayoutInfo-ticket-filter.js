import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
class LayoutInfoTicketFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            toLocation      : '',
            fromLocation    : '',
            trips           : [],
            carsName        : [],
            nameCar         : 'default'
        }
        this.onChangeCarName = this.onChangeCarName.bind(this);
    }
    onChangeCarName(e){
        e.preventDefault();
        console.log(e.target.value)
    }
    componentWillReceiveProps(props){
        if(props.from && props.to){
            this.setState({
                toLocation      : props.to,
                fromLocation    : props.from,
            })
        }
    }

    componentDidMount(){
        if(this.props.info_location.length == 0){
            axios.get('http://127.0.0.1:8000/api/home').then( res => {
              if(res.data){	
                this.setState({ trips : res.data });
              }			
            }).catch(err => {throw err});
          }else{
            this.setState({
              trips : this.props.info_location
            })
        }
        
        axios.get('http://127.0.0.1:8000/api/home/get-name-cars').then( res => {
            if(res.data){	
              this.setState({ carsName : res.data });
            }			
          }).catch(err => {throw err});
        
    }
    render() {
        return (
            <div className="col-lg-3">
                <div className="d-flex justify-content-between">
                    <p className="nav-link"><strong>Bộ lọc tìm kiếm</strong></p>
                    <a className="nav-link" href="#"><small>Xóa lọc</small></a>
                </div>
                <div className="card">
                    <div className="card-body">
                        <form className="row" >
                            <p className="col-lg-12"><strong>Tiêu chí phổ biến</strong></p>
                            <div className="col-12 ">
                                <div className="form-group  text-muted">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={true}
                                                // onChange=""
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Chuyến giảm giá"
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group text-muted">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={true}
                                                // onChange=""
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="XE VIP"
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group text-muted">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={true}
                                                // onChange=""
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Vé Giảm Giá"
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <Typography id="range-slider" gutterBottom>
                                    Giờ Đi
                    </Typography>
                                <Slider
                                    value={10}
                                    // onChange=''
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={this.valuetext}
                                />
                            </div>
                            <div className="col-12">
                                <Typography id="range-slider" gutterBottom>
                                    Gía Vé
                    </Typography>
                                <Slider
                                    value={10}
                                    // onChange=''
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={this.valuetext}
                                />
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <FormControl className="from">
                                        <InputLabel >Nhà Xe</InputLabel>
                                        <Select
                                            native
                                            value       = { this.state.nameCar }
                                            onChange    = { (e) => this.onChangeCarName(e)}
                                            // inputProps={{
                                            //     name: 'age',
                                            //     id: 'age-native-simple',
                                            // }}
                                        >
                                             <option value=''></option>
                                            <option aria-label="None" value="default">Chọn nhà xe</option>
                                            { this.state.carsName.map((value, key) =>  <option key = {key} value={ value.Passenger_Car_Id }>{value.Passenger_Car_Name}</option>)}
                                            
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <FormControl className="from">
                                        <InputLabel >Điểm Xuất Phát</InputLabel>
                                        <Select
                                            native
                                            value = {this.state.fromLocation}
                                            // onChange=""
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-native-simple',
                                            }}
                                        >
                                            <option value=''></option>
                                         { this.state.trips.map((value, key) => {
                                            return (
                                            <option value = { value.Trips_ID } key = { key }>{value.Trips_Start}</option>
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
                                        <InputLabel >Điểm Kết Thúc</InputLabel>
                                        <Select
                                            native
                                            value={this.state.toLocation}
                                            // onChange=""
                                           
                                        >
                                            <option value=''></option>
                                        { this.state.trips.map((value, key) => {
                                            return (
                                            <option value = { value.Trips_ID } key = { key }>{value.Trips_Ends}</option>
                                            )
                                            })   
                                        }
                                        </Select>
                                    </FormControl>
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
      info_location : state.User.info_location
    };
}
export default connect(mapStateToProps, null)(LayoutInfoTicketFilter);
