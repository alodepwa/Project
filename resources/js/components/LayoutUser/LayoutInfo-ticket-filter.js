import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
class LayoutInfoTicketFilter extends Component {
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
        )
    }
}

export default LayoutInfoTicketFilter
