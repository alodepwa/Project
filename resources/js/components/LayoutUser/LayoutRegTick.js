import React from 'react';
import { connect } from 'react-redux';
import LayoutInfoTicket from './LayoutInfo-ticket';
import LayoutInfoTicketFilter from './LayoutInfo-ticket-filter';
import {
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Pagination from '@material-ui/lab/Pagination';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
function valuetext(value) {
  return `10°C`;
}
class LayoutRegTick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromLocation: 1,
      toLocation: 1,
      dateSearch: new Date(),
      trips: []
    }
  }
  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/home').then( res => {
			if(res.data)
				this.setState({ trips : res.data });
		}).catch(err => {throw err});
  }
  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="title">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="" >
                  Material-UI
                  </Link>
                <Link color="inherit" to="" >
                  Core
                  </Link>
                <Typography color="textPrimary">Breadcrumb</Typography>
              </Breadcrumbs></div>
            <div className="menu-search mt-4">
              <FormControl >
                <InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
                <Select
                  className="inputSearch"
                  name="fromLocation"
                  labelId="demo-simple-select-label"
                  value={this.props.fromLocation}
                // onChange={e => this.onChangeInp(e)}
                >
                  {
                    this.state.trips.map((value, key) => {
                      return (
                        <MenuItem key={key} value={value.Trips_ID}>{value.Trips_Start}</MenuItem>
                      );
                    })
                  }
                </Select>
              </FormControl>
              <FormControl >
                <InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
                <Select
                  className="inputSearch"
                  name="toLocation"
                  labelId="demo-simple-select-label"
                  value={this.state.toLocation}
                // onChange={e => this.onChangeInp(e)}

                >
                  {
                    this.state.trips.map((value, key) => {
                      return (
                        <MenuItem value={key} key={key}>{value.Trips_Ends}</MenuItem>
                      );
                    })
                  }
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  value={this.state.dateSearch}
                  // onChange={this.onChangeInpDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button className="btnSearch" variant="contained" disabled={((this.state.fromLocation === 10) || (this.state.toLocation === 10)) ? true : false} color="primary" endIcon={<Icon>send</Icon>}>
                Tìm Vé Xe
              </Button>
            </div>
          </div>
        </div>


        <div className="row">

          <div>
            <div className="container mt-4">
              <div className="row">
                {/* fileter */}
                  <LayoutInfoTicketFilter />
                <div className="col-lg-9 ">
                  <div className="py-2">
                    <h4>Vé xe từ Đà Nẵng đi Ninh Bình: <span className="text-muted">15 chuyến</span> </h4>
                  </div>
                  <div className="nav justify-content-between">
                    <div className="nav-item">
                      <p className="nav-link"><small>Sắp xếp theo:</small></p>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link" href="#">Giờ sớm nhất</a>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link" href="#">Giờ muộn nhất</a>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link" href="#">Giá thấp nhất</a>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link" href="#">Giờ cao nhất</a>
                    </div>
                  </div>
                  {/* card content */}
                    <LayoutInfoTicket />
                </div>
              </div>
            </div>



            {/* pagination */}
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="pagination">
                    <Pagination count={10} color="primary" />
                  </div>
                </div>
              </div>
            </div>



            {/* Thông tin chung về tuyến đường */}
            <div className="container my-4">


            </div>
            {/* link liên kết */}
            <div className="bg-light">
              <div className="container">
                <div className="row mb-4">
                  <div className="col-lg-3 col-md-6">
                    <div className="d-flex flex-column">
                      <div className="nav-link"><strong>Tuyến đường</strong></div>
                      <div className="d-flex flex-column">
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="flex-column">
                      <div className="nav-link"><strong>Bến xe</strong></div>
                      <div className="d-flex flex-column">
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="d-flex flex-column">
                      <div className="nav-link"><strong>Nhà xe</strong></div>
                      <div className="d-flex flex-column">
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                        <a className="nav-link" href="#">Hà nội đi vinh</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="d-flex flex-column">
                      <div className="nav-link"><strong>Xe Limousine</strong></div>
                      <div className="d-flex flex-column">
                        <a className="nav-link" href="#">Limousine Sài Gòn đi Đà Lạt</a>
                        <a className="nav-link" href="#">Limousine Sài Gòn đi Đà Lạt</a>
                        <a className="nav-link" href="#">Limousine Sài Gòn đi Đà Lạt</a>
                        <a className="nav-link" href="#">Limousine Sài Gòn đi Đà Lạt</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end link liên kết */}
            {/* footer */}
            <div className="bg-dark">
              <div className="container py-4">
                <div className="text-center text-light">
                  <div><strong>Công ty cổ phần Vexere</strong></div>
                  <div>Địa chỉ đăng ký kinh doanh: 8C Chữ Đồng Tử, Phường 7, Quận Tân Bình, Thành Phố Hồ Chí Minh, Việt Nam</div>
                  <a className="nav-link" href="#">Địa chỉ: Lầu 8,9, Tòa nhà CirCO, 222 Điện Biên Phủ, Quận 3, TP. Hồ Chí Minh, Việt Nam</a>
                  <div>Giấy chứng nhận ĐKKD số 0312387105 do Sở KH và ĐT TP. Hồ Chí Minh cấp lần đầu ngày 25/7/2013</div>
                  <div>Bản quyền © 2019 thuộc về Bùi Tấn Toán</div>
                </div>
              </div>
            </div>

          </div>

        </div>


      </div >
    );
  }
}
const mapStateToProps = (state) => {
    return {
      info_location : state.User.info_location
    };
}
export default connect( mapStateToProps, null )( LayoutRegTick );
