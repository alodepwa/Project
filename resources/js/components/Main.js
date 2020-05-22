import React ,{Component}   from 'react';
import ReactDOM             from 'react-dom';
import {createStore}        from 'redux';
import {myReducer}          from './../Reducers';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    HashRouter,
    withRouter,
    useHistory,
    useLocation,
    Redirect
} from "react-router-dom";
import LayoutHome  from './LayoutUser/LayoutHome';
import LayoutRegTick from './LayoutUser/LayoutRegTick';
import LayoutMangerTicket from './LayoutUser/LayoutMangerTicket';
import LayoutLogin from './LayoutAdmin/LayoutLogin';
import LayoutHomeAdmin  from './LayoutAdmin/LayoutHomeAdmin';
import { Provider } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateRoute from './PrivateRoute';

class Main extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <HashRouter>
                {/* <div className="loading123">
                    <CircularProgress disableShrink />
                </div> */}
                <div className="layout">
                    <div className="container">
                        <div className="header">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="d-flex align-items-center justify-content-around">
                                        <div className="logo nav-link flex-fill"> <h5 className="logoMenu">VÉ XE 2020</h5></div>
            
                                        <div className="menu flex-fill" id="">
                                            <ul  className="d-flex mr-auto">
                                                <li className="nav-item nav-link">
                                                    <Link to="/"><i className="fas fa-bus-alt" title="ve xe"/><small className="hide-title">Vé Xe</small></Link>
                                                </li>
                                                <li className="nav-item nav-link">
                                                    <Link to="/admin"><i className="fas fa-tv" title="Phần Mềm Nhầ Xe"/> <small className="hide-title">Phần Mềm Nhà Xe</small></Link>
                                                </li>
                                                <li className="nav-item nav-link">
                                                    <Link to="/manager-ticket"><i className="fas fa-ticket-alt" title="Quản Lý Vé"/> <small className="hide-title">Quản Lý Vé</small></Link>
                                                </li>
                                                <li className="nav-item nav-link">
                                                    <Link to="/alo2"><i className="fas fa-globe-africa" title="Việt Nam"/> <small className="hide-title">Viet Nam</small></Link>
                                                </li>
                                                <li className="nav-item nav-link">
                                                    <Link to=""><i className="fas fa-phone-volume" title="Call Now"/><small className="hide-title">Gọi ngay</small></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   <Switch>
                        <Route exact path="/">
                            <LayoutHome  />
                        </Route>
                        <Route path="/search">
                            <LayoutRegTick />
                        </Route>
                        <Route path="/manager-ticket">
                            <LayoutMangerTicket />
                        </Route>
                        <Route path="/login">
                            <LayoutLogin />
                        </Route>
                        <PrivateRoute path="/admin">
                            <LayoutHomeAdmin />
                        </PrivateRoute>
                   </Switch>
                </div>
            </HashRouter>
        );

    }
}

export default withRouter(Main);

const myStore = createStore(myReducer);
if (document.getElementById('vexe')) {
    ReactDOM.render(
        <Provider store = {myStore} >
            <Main />
        </Provider>
        ,
         document.getElementById('vexe'));
}
