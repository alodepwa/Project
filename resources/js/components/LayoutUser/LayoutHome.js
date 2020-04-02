import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../../Actions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import axios  from 'axios';
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

class LayoutHome extends React.Component {
	 constructor(props){
        super(props);
        this.state = {
        	dateSearch   : new Date(),
        	toLocation   : 10,
			fromLocation : 10,
			trips        : []
        };
        this.onChangeInp  		= this.onChangeInp.bind(this);
		this.onChangeInpDate  	= this.onChangeInpDate.bind(this);
		this.onClickSearch 		= this.onClickSearch.bind(this);
	}
	onClickSearch(e){
		this.props.history.push("/alo");
	}

    onChangeInp(e){
    	this.setState({
    		[e.target.name] : e.target.value
       	});
    }
    onChangeInpDate(date){
    	this.setState({
    		dateSearch : date
    	});
    }
	
	// handle when click btn "tìm Vé Xe"

	componentDidMount(){
		axios.get('http://127.0.0.1:8000/api/home').then( res => {
			if(res.data)
				this.setState({ trips : res.data });
				this.props.info_location(res.data);
		}).catch(err => {throw err});
	}

	render() {
		return (
			<div className="body">
			  <div className="top">
			    <div className="container">
			      	<div className="row">
			        	<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 body-top">
			          		<div className="title"><h3>Vé Xe 2020 - Hệ thống đặt vé xe trên cả nước Việt Nam.</h3></div>
			          			<div className="menu-search mt-4">
						            <FormControl className="">
									    <InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
									    <Select
									    	className 	= "inputSearch"
									    	name 		= "fromLocation"
									        labelId		= "demo-simple-select-label"
									        id 			= "demo-simple-select"
									        value 		= {this.state.fromLocation}
									        onChange 	= { e => this.onChangeInp(e) }
									    >
										{
											this.state.trips.map( (value, key) => { 
												return (
													<MenuItem key = {key} value={value.Trips_ID}>{value.Trips_Start}</MenuItem> 
												); 
											})
										}
									    </Select>
									</FormControl>
						            <FormControl className="">
										<InputLabel id="demo-simple-select-label"><i className="fas iconLocation fa-map-marker-alt"></i></InputLabel>
										<Select
											className 	= "inputSearch"
									    	name 		= "toLocation"
											labelId 	="demo-simple-select-label"
											id 			="demo-simple-select"
											value		= {this.state.toLocation}
									        onChange 	= { e => this.onChangeInp(e) }

										>
											{
												this.state.trips.map( (value, key) => {
													return (
													<MenuItem value={key} key ={key}>{value.Trips_Ends}</MenuItem>
													);
												})
											}
										</Select>
									</FormControl>
						            <MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											disableToolbar
											variant		="inline"
											format		="MM/dd/yyyy"
											margin		="normal"
											id			="date-picker-inline"
											value		=  {this.state.dateSearch}
											onChange    = {this.onChangeInpDate}
											KeyboardButtonProps={{
											'aria-label': 'change date',
											}}
										/>
									</MuiPickersUtilsProvider>
						            <Button className="btnSearch" onClick={ (e) => this.onClickSearch(e) } variant="contained" disabled = {((this.state.fromLocation === 10) || (this.state.toLocation === 10)) ? true : false} color="primary" endIcon={<Icon>send</Icon>}>
										{/* <Link to={{ pathname: "/alo", state : {to : this.state.toLocation, from : this.state.fromLocation, date: this.state.dateSearch} }}></Link>   */}
										Tìm Vé Xe
									</Button>
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
								          image="https://images5.alphacoders.com/374/374077.jpg"
								          title="Contemplative Reptile"
								        />
								        <CardContent>
								          <Typography gutterBottom variant="h5" component="h2">
								            Lizard
								          </Typography>
								          <Typography variant="body2" color="textSecondary" component="p">
								            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
								            across all continents except Antarctica
								          </Typography>
								        </CardContent>
							      	</CardActionArea>
							      	<CardActions>
								        <Button size="small" color="primary">
								          	Share
								        </Button>
								        <Button size="small" color="primary">
								         	Learn More
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
								          image="https://images5.alphacoders.com/374/374077.jpg"
								          title="Contemplative Reptile"
								        />
								        <CardContent>
								          <Typography gutterBottom variant="h5" component="h2">
								            Lizard
								          </Typography>
								          <Typography variant="body2" color="textSecondary" component="p">
								            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
								            across all continents except Antarctica
								          </Typography>
								        </CardContent>
							      	</CardActionArea>
							      	<CardActions>
								        <Button size="small" color="primary">
								          	Share
								        </Button>
								        <Button size="small" color="primary">
								         	Learn More
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
								          image="https://images5.alphacoders.com/374/374077.jpg"
								          title="Contemplative Reptile"
								        />
								        <CardContent>
								          <Typography gutterBottom variant="h5" component="h2">
								            Lizard
								          </Typography>
								          <Typography variant="body2" color="textSecondary" component="p">
								            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
								            across all continents except Antarctica
								          </Typography>
								        </CardContent>
							      	</CardActionArea>
							      	<CardActions>
								        <Button size="small" color="primary">
								          	Share
								        </Button>
								        <Button size="small" color="primary">
								         	Learn More
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
			        <div className="row">
			          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 content">
			            <div className="block d-flex">
			              <a href = "#"><i className="fas fa-map-marked-alt" /></a>
			              <a href = "#"><h4>5000+</h4><br />Tuyến đường</a>
			            </div>
			            <div className="block d-flex">
			              <a href = "#"><i className="fas fa-toggle-on" /></a>
			              <a href = "#"><h4>5000+</h4><br />Tuyến đường</a>
			            </div>
			            <div className="block d-flex">
			              <a href = "#"><i className="fas fa-toggle-on" /></a>
			              <a href = "#"><h4>5000+</h4><br />Tuyến đường</a>
			            </div>
			            <div className="block d-flex">
			              <a href = "#"><i className="fas fa-toggle-on" /></a>
			              <a href = "#"><h4>5000+</h4><br />Tuyến đường</a>
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
const mapDispatchToProps = (dispatch, state) =>{
	return {
		info_location : value => {
			dispatch(actions.info_location(value))
		}
	}
}

export default connect(null, mapDispatchToProps)(withRouter(LayoutHome));
