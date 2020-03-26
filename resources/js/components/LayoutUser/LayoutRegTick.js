import React from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
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
                  value={this.state.fromLocation}
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
                                value={10}
                                // onChange=""
                                inputProps={{
                                  name: 'age',
                                  id: 'age-native-simple',
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
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
                                value={10}
                                // onChange=""
                                inputProps={{
                                  name: 'age',
                                  id: 'age-native-simple',
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
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
                                value={10}
                                // onChange=""
                                inputProps={{
                                  name: 'age',
                                  id: 'age-native-simple',
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
                  {/* item one */}
                  <div className="container mb-4 ">
                    <div className="card hover-content">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-3 col-12">
                            <img className="image" src="images/xe_khach_1_1.jpg" alt="xe khách" height="170px" width="100%" />
                          </div>
                          <div className="col-lg-5 col-12">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="d-flex flex-column ">
                                  <div className="d-flex">
                                    <strong>Tân Kim Chi</strong>
                                    <span><i className="far fa-star" />4.0</span>
                                    <li className="text-muted">32 đánh giá</li>
                                  </div>
                                  <p><small>Giường nằm 44 chỗ</small></p>
                                </div>
                              </div>
                              <div className="col-lg-12 ">
                                <div className="time">
                                  <div>
                                    <p>
                                      <i className="far fa-dot-circle" />
                                      <strong>19:30</strong>
                                      <span data-toggle="tooltip" data-placement="top" title="Nam Tran-Thanh Tinh">Đà Nẵng Office</span>
                                    </p>
                                  </div>
                                  <div>
                                    <p data-toggle="tooltip" data-placement="top" title="Strips time about"><small>9h15m</small></p>
                                  </div>
                                  <div>
                                    <p>
                                      <i className="fas fa-map-marker-alt" />
                                      <strong>04:45</strong>
                                      <span data-toggle="tooltip" data-placement="top" title="Tran Nhan Tong Street, Ninh Phuc Ward">Big C Ninh Bình</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-12">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-start">
                                  <h3><strong>310,000 đ</strong></h3>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="d-flex flex-column">
                                  <div className="d-flex justify-content-start">
                                    <p><small>26 chổ trống</small></p>
                                  </div>
                                  <div className="d-flex justify-content-center">
                                    <div className="btn btn-primary btn_info">
                                      Thông tin chi tiết
                                    </div>
                                    <div className="btn btn-success btn_book">
                                      Đặt Vé
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-muted">
                          <p><small>Vé chặng thuộc chuyến 20:15 26-03-2020 Đà Nẵng - Hà Nội</small></p>
                        </div>
                        {/* toggler */}
                        <div className="col_btn_info">
                          <div className="border border-left-0 border-right-0 border-bottom-0">
                            <nav className="nav nav-tabs justify-content-around">
                              <a className="nav-link active" href="#" data-toggle="tab" data-target="#imagesId">Hình ảnh</a>
                              <a className="nav-link" href="#" data-toggle="tab" data-target="#map">Điểm đón trả</a>
                              <a className="nav-link" href="#" data-toggle="tab" data-target="#danhgia">Đánh giá</a>
                              <a className="nav-link" href="#danhgia" data-toggle="tab" data-target="#info">Thông tin khác</a>
                            </nav>
                            <div className="tab-content mt-3">
                              <div className="container tab-pane active" id="imagesId">
                                <img src="{{asset('/images/xe_khach_1.jpg')}}" alt="" />
                              </div>
                              <div className="container tab-pane" id="map">
                                <p><strong>Lưu ý</strong></p>
                                <p>Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.
                                  Lịch này có thể thay đổi tùy tình hình thưc tế.</p>
                                <div className="d-flex justify-content-between">
                                  <p>something where</p>
                                  <p>something where</p>
                                </div>
                              </div>
                              <div className="container tab-pane" id="danhgia">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="d-flex justify-content-start">
                                      <p><span><i className="far fa-star" />4.0</span></p>
                                      <div className="mx-3 color">
                                        <span><i className="far fa-star" /></span>
                                        <span><i className="far fa-star" /></span>
                                        <span><i className="far fa-star" /></span>
                                        <span><i className="far fa-star" /></span>
                                        <span><i className="far fa-star" /></span>
                                      </div>
                                      <p /><li>32 đánh giá</li><p />
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="row">
                                      <div className="col-lg-4">
                                        <div className="d-flex flex-column">
                                          <div>
                                            <p>chất lượng xe</p>
                                          </div>
                                          <div className="progress" style={{ height: '10px' }}>
                                            <span className="progress-bar" style={{ width: '50%' }}>70%</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="d-flex flex-column">
                                          <div>
                                            <p>Đúng giờ</p>
                                          </div>
                                          <div className="progress" style={{ height: '10px' }}>
                                            <span className="progress-bar" style={{ width: '50%' }}>70%</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="d-flex flex-column">
                                          <div>
                                            <p>Thái độ phục vụ</p>
                                          </div>
                                          <div className="progress" style={{ height: '10px' }}>
                                            <span className="progress-bar" style={{ width: '50%' }}>70%</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    {/*content comment  */}
                                    <div className="mt-3 border border-bottom-0 border-right-0 border-left-0">
                                      <div className="row mt-3">
                                        <div className="col-lg-4">
                                          <div className="d-flex flex-column text-center">
                                            <div className="d-flex justify-content-center">
                                              <span className="fas fa-user-alt display-3" />
                                            </div>
                                            <p>Nam</p>
                                          </div>
                                        </div>
                                        <div className="col-lg-8">
                                          <div className="d-flex flex-column">
                                            <div className="d-flex flex-column">
                                              <div className="color">
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                              </div>
                                              <p className="text-muted">Nhận xét vào 27/09/2018</p>
                                            </div>
                                            <div>
                                              <p>
                                                Đi xe Kim Chi khá ổn, xe có nhiều chuyến trong ngày. Mình thường đi chuyến tối, ăn uống nghỉ ngơi xong mình lên xe ngủ 1 giấc là về nhà.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-3 border border-bottom-0 border-right-0 border-left-0">
                                      <div className="row mt-3">
                                        <div className="col-lg-4">
                                          <div className="d-flex flex-column text-center">
                                            <div className="d-flex justify-content-center">
                                              <span className="fas fa-user-alt display-3" />
                                            </div>
                                            <p>Nam</p>
                                          </div>
                                        </div>
                                        <div className="col-lg-8">
                                          <div className="d-flex flex-column">
                                            <div className="d-flex flex-column">
                                              <div className="color">
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                                <span><i className="far fa-star" /></span>
                                              </div>
                                              <p className="text-muted">Nhận xét vào 27/09/2018</p>
                                            </div>
                                            <div>
                                              <p>
                                                Đi xe Kim Chi khá ổn, xe có nhiều chuyến trong ngày. Mình thường đi chuyến tối, ăn uống nghỉ ngơi xong mình lên xe ngủ 1 giấc là về nhà.
                                    </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* end content comment */}
                                  </div>
                                </div>
                              </div>
                              <div className="container tab-pane" id="info">
                                <p>Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.
                                  Lịch này có thể thay đổi tùy tình hình thưc tế.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*  */}
                      </div>
                    </div>
                  </div>
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
export default LayoutRegTick;
