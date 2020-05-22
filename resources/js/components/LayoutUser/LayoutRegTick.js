import React from 'react';
import moment from 'moment';
import * as common from './../../common';
import { connect } from 'react-redux';
import LayoutInfoTicket from './LayoutInfo-ticket';
import LayoutInfoTicketFilter from './LayoutInfo-ticket-filter';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Pagination from '@material-ui/lab/Pagination';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
class LayoutRegTick extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fromLocation: '',
			toLocation: '',
			dateSearch: new Date(),
			trips: [],
			posts: [],
			postOnePage: [],
			postPage: [],
			currentPage: 1,
			page: 0,
			end: [],
			start: []
		}
		this.searchPosts = this.searchPosts.bind(this);
		this.onChangeInp = this.onChangeInp.bind(this);
		this.onChangeInpDate = this.onChangeInpDate.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, value) {
		event.preventDefault();
		let { posts } = this.state;
		let postOnePage = posts.slice(((value - 1) * 10), (value * 10 - 1));
		this.setState({
			postOnePage,
			currentPage: value
		})
	}
	onChangeInp(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	onChangeInpDate(date) {
		let dateSearch = moment(date).format('YYYY-MM-DD');
		this.setState({
			dateSearch
		});
	}
	searchPosts(e) {
		e.preventDefault();
		let { toLocation, fromLocation, dateSearch, end, start } = this.state;
		let nameFromLocation, nameToLocation;
		let data = {
			toLocation,
			fromLocation,
			dateSearch
		};
		end.forEach(element => {
			if (element.Trips_Ends == toLocation)
				nameToLocation = element.Trips_Ends.replace(/ /g, '-')
		});
		start.forEach(element => {
			if (element.Trips_Start == fromLocation)
				nameFromLocation = element.Trips_Start.replace(/ /g, '-')
		});
		this.props.history.push({
			pathname: `/search`,
			// search 		: `${dateSearch}?${nameFromLocation}?${nameToLocation}`
			hash: `#${dateSearch}#${nameFromLocation}#${nameToLocation}`,
		});
		axios.post(`${common.HOST}home/get-post`, data)
			.then(res => {
				if (res.data) {
					let numberPage = res.data.length / 10;
					let { currentPage } = this.state;
					let postOnePage = res.data.slice(((currentPage - 1) * 10), (currentPage * 10 - 1));
					this.setState({
						postOnePage,
						posts: res.data,
						page: numberPage > 1 ? Math.ceil(numberPage) : 0
					});
				}
			})
			.catch(err => { throw err; });
	}

	async componentDidMount() {
		let data = [];
		let hash = this.props.history.location.hash ? this.props.location.hash : '';
		if (hash) {
			let arr = hash.split("#")
			this.setState({
				fromLocation: arr[2].replace(/-/g, ' '),
				toLocation: arr[3].replace(/-/g, ' '),
				dateSearch: arr[1]
			});
			data = {
				fromLocation: arr[2].replace(/-/g, ' '),
				toLocation: arr[3].replace(/-/g, ' '),
				dateSearch: arr[1]
			};
		}

		//get posts
		await axios.post(`${common.HOST}home/get-post`, data)
			.then(res => {
				if (res.data) {
					let numberPage = res.data.length / 10;
					let { currentPage } = this.state;
					let postOnePage = res.data.slice(((currentPage - 1) * 10), (currentPage * 10 - 1));
					this.setState({
						postOnePage,
						posts: res.data,
						page: numberPage > 1 ? Math.ceil(numberPage) : 0
					});
				}
			})
			.catch(err => { throw err; });

		if (this.props.info_location.length == 0) {
			axios.get('http://127.0.0.1:8000/api/home').then(res => {
				if (res.data) {
					this.setState({ end: res.data['end'], start: res.data['start'] });
				}
			}).catch(err => { throw err });
		} else {
			this.setState({
				end: this.props.info_location['end'],
				start: this.props.info_location['start']
			})
		}
	}

	render() {
		return (
			<div className="container">
				<div className="loading"> </div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
						<div className="menu-search mt-4">
							<div className="row">
								<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
									<FormControl >
										<InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
										<Select
											className="inputSearch"
											name="fromLocation"
											labelId="demo-simple-select-label"
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
									<FormControl >
										<InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
										<Select
											className="inputSearch"
											name="toLocation"
											labelId="demo-simple-select-label"
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
											id="date-picker-inline"
											value={this.state.dateSearch}
											onChange={this.onChangeInpDate}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</MuiPickersUtilsProvider>
								</div>
								<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
									<Button onClick={(e) => this.searchPosts(e)} className="btnSearch" variant="contained" disabled={this.state.fromLocation && this.state.toLocation ? false : true} color="primary" endIcon={<Icon>send</Icon>}>
										Tìm Vé Xe
              						</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div>
						<div className="container mt-4">
							<div className="row">
								{/* fileter */}
								<div className="col-xs-0 col-sm-0 col-md-0 col-lg-3 layoutFilter">
									<LayoutInfoTicketFilter end={this.state.end} start={this.state.start} to={this.state.toLocation} from={this.state.fromLocation} />
								</div>
								<div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">
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
									<LayoutInfoTicket posts={this.state.postOnePage} />
								</div>
							</div>
						</div>

						{/* pagination */}
						<div className="container">
							{this.state.page ? (
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										<div className="pagination">
											<Pagination count={this.state.page} page={this.state.currentPage} color="primary" onChange={this.handleChange} />
										</div>
									</div>
								</div>
							) : ''}
						</div>

						{/* footer */}
						<div className="container footer mt-5">
							<div className="top">
								<div className="top-title">
									<h3 className="pb-3">Vé Xe 2020</h3>
								</div>
								<div className="bottom-title">
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
								</div>
							</div>
							<div className="bottom my-5">
								<div className="left">
									&copy; 2020 All rights reserved.
								</div>
								<div className="right">
									<i className="fab fa-twitter"></i>
									<i className="fab fa-facebook"></i>
									<i className="fab fa-google-plus-g"></i>
									<i className="fab fa-skype"></i>
									<i className="fab fa-youtube"></i>
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
		info_location: state.User.info_location
	};
}
export default connect(mapStateToProps, null)(withRouter(LayoutRegTick));
