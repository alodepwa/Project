import React, {Component} from 'react';

class LayoutHome extends React.Component {
	 constructor(props){
        super(props);
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
			            <form >
			              <input type="text" />
			              <input type="text" />
			              <input type="text" />
			              <button className="btn btn-info">Tìm Vé Xe</button> 
			            </form>
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
			          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 content">
			            <div className="block">
			              <a href = "#"><img src="https://images5.alphacoders.com/374/374077.jpg" alt="" /></a>
			            </div>
			            <div className="block">
			              <a href = "#"><img src="https://images5.alphacoders.com/374/374077.jpg" alt="" /></a>
			            </div>
			            <div className="block">
			              <a href = "#"><img src="https://images5.alphacoders.com/374/374077.jpg" alt="" /></a>
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
export default LayoutHome;
