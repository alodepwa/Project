import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../Actions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
	withRouter
} from "react-router-dom";
import moment from 'moment';

class LayoutHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateSearch: new Date(),
			toLocation: 10,
			fromLocation: 10,
			start: [],
			end: []
		};
		this.onChangeInp = this.onChangeInp.bind(this);
		this.onChangeInpDate = this.onChangeInpDate.bind(this);
		this.onClickSearch = this.onClickSearch.bind(this);
	}
	onClickSearch(e) {
		let { dateSearch, toLocation, fromLocation, end, start } = this.state;
		let nameToLocation, nameFromLocation;
		end.forEach(element => {
			if (element.Trips_Ends == toLocation)
				nameToLocation = element.Trips_Ends.replace(/ /g, '-')
		});
		start.forEach(element => {
			if (element.Trips_Start == fromLocation)
				nameFromLocation = element.Trips_Start.replace(/ /g, '-')
		});
		dateSearch = moment(dateSearch).format('YYYY-MM-DD');
		this.props.history.push({
			pathname: `/search`,
			// search 		: `${dateSearch}?${nameFromLocation}?${nameToLocation}`
			hash: `#${dateSearch}#${nameFromLocation}#${nameToLocation}`,
		});
	}

	onChangeInp(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	onChangeInpDate(date) {
		this.setState({
			dateSearch: date
		});
	}

	// handle when click btn "tìm Vé Xe"

	componentDidMount() {
		axios.get('http://127.0.0.1:8000/api/home').then(res => {
			if (res.data) {
				this.setState({ start: res.data['start'], end: res.data['end'] });
				this.props.info_location(res.data);
			}
		}).catch(err => { throw err });
	}

	render() {
		return (
			<div className="body">
				<div className="top">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 body-top">
								{/* <div className="title"><h3>Vé Xe 2020 - Hệ thống đặt vé xe trên cả nước Việt Nam.</h3></div> */}
								<div className="menu-search mt-4">
									<div className="row">
										<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
											<FormControl className="">
												<InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
												<Select
													className="inputSearch"
													name="fromLocation"
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={this.state.fromLocation}
													onChange={e => this.onChangeInp(e)}

												>
													{

														this.state.start.map((value, key) => {
															return (
																<MenuItem key={key} value={value.Trips_Start}>{value.Trips_Start}</MenuItem>
															);
														})
													}
												</Select>
											</FormControl>
										</div>
										<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
											<FormControl className="">
												<InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
												<Select
													className="inputSearch"
													name="toLocation"
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={this.state.toLocation}
													onChange={e => this.onChangeInp(e)}

												>
													{
														this.state.end.map((value, key) => {
															return (
																<MenuItem value={value.Trips_Ends} key={key}>{value.Trips_Ends}</MenuItem>
															);
														})
													}
												</Select>
											</FormControl>
										</div>
										<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<KeyboardDatePicker
													disableToolbar
													variant="inline"
													format="MM/dd/yyyy"
													margin="normal"
													id="dateIcon"
													value={this.state.dateSearch}
													onChange={this.onChangeInpDate}
													KeyboardButtonProps={{
														'aria-label': 'change date',
													}}
												/>
											</MuiPickersUtilsProvider>
										</div>
										<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
											<Button className="btnSearch" onClick={(e) => this.onClickSearch(e)} variant="contained" disabled={((this.state.fromLocation === 10) || (this.state.toLocation === 10)) ? true : false} color="primary" endIcon={<Icon>send</Icon>}>
												Tìm Vé Xe
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container ">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="center">
							<div className="title">
								<h4>Khuyến Mãi - Ưu Đãi nổi bật.</h4>
							</div>
							<div className="row">
								<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 content">
									<div className="block">
										<Card className="">
											<CardActionArea>
												<CardMedia
													component="img"
													alt="Contemplative Reptile"
													height="140"
													image="https://static.vexere.com/production/banners/330/banner-trang-chu-ok.png"
													title="Contemplative Reptile"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2">
														Dùng Ngay App
								          </Typography>
													<Typography variant="body2" color="textSecondary" component="p">
														Với nhiều hẫng xe chất lượng cùng đội ngũ tài xuế chuyên nghiệp bạn hay uyên tâm đi
								          </Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button size="small" color="primary">
													Chia Sẽ
								        </Button>
												<Button size="small" color="primary">
													Nhiều Hơn
								        </Button>
											</CardActions>
										</Card>
									</div>
								</div>
								<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 content">
									<div className="block">
										<Card className="">
											<CardActionArea>
												<CardMedia
													component="img"
													alt="Contemplative Reptile"
													height="140"
													image="https://static.vexere.com/blog/uploads/2020/03/gps1.jpg"
													title="Contemplative Reptile"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2">
														Tìm Vị Trí
								          </Typography>
													<Typography variant="body2" color="textSecondary" component="p">
														Ứng dụng có thể biết vị trí của bạn thông qua google map để đón bạn lên xe
								          </Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button size="small" color="primary">
													Chia Sẽ
								        </Button>
												<Button size="small" color="primary">
													Nhiều Hơn
								        </Button>
											</CardActions>
										</Card>
									</div>
								</div>
								<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 content">
									<div className="block">
										<Card className="">
											<CardActionArea>
												<CardMedia
													component="img"
													alt="Contemplative Reptile"
													height="140"
													image="https://static.vexere.com/blog/uploads/2020/05/be1.png"
													title="Contemplative Reptile"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2">
														Ưu Đải Sốc
								          </Typography>
													<Typography variant="body2" color="textSecondary" component="p">
														Tải ứng dụng để nhận ngay nhiều ưu đãi đặc biệt từ hệ thống bán vé
								          </Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button size="small" color="primary">
													Chia Sẽ
								        </Button>
												<Button size="small" color="primary">
													Nhiều Hơn
								        </Button>
											</CardActions>
										</Card>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="bottom">
							<div className="title">
								<h4>Hệ thống vé xe trên cả nước Việt Nam.</h4>
							</div>
							<div className="card">
								<div className="card-header">
									<div className="row">
										<div className="col-xs-3 col-md-3 col-lg-3 col-sm-3 content">
											<div className="d-flex">
												<a href="#">
													<img className="card-img" src="https://image.plo.vn/Uploaded/2020/cqjwqcdwp/2019_08_14/8-bxmd-1_qltc.jpg" alt=""></img>
												</a>
											</div>
										</div>
										<div className="col-xs-3 col-md-3 col-lg-3 col-sm-3 content">
											<div className=" d-flex">
												<a href="#">
													<img className="card-img" src="https://image.plo.vn/Uploaded/2020/cqjwqcdwp/2019_08_14/8-bxmd-1_qltc.jpg" alt=""></img>
												</a>
											</div>
										</div>
										<div className="col-xs-3 col-md-3 col-lg-3 col-sm-3 content">
											<div className=" d-flex">
												<a href="#">
													<img className="card-img" src="https://image.plo.vn/Uploaded/2020/cqjwqcdwp/2019_08_14/8-bxmd-1_qltc.jpg" alt=""></img>
												</a>
											</div>
										</div>
										<div className="col-xs-3 col-md-3 col-lg-3 col-sm-3 content">
											<div className=" d-flex">
												<a href="#">
													<img className="card-img" src="https://image.plo.vn/Uploaded/2020/cqjwqcdwp/2019_08_14/8-bxmd-1_qltc.jpg" alt=""></img>
												</a>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch, state) => {
	return {
		info_location: value => {
			dispatch(actions.info_location(value))
		}
	}
}

export default connect(null, mapDispatchToProps)(withRouter(LayoutHome));
