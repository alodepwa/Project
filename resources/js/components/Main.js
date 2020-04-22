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
import { useSelector  } from 'react-redux';



function PrivateRoute({children, ...rest}){
    var isLogin = useSelector(state => {
        return sessionStorage.getItem('isLogin') ? sessionStorage.getItem('isLogin') : false;
    });
    return (
        <Route
            {...rest}
            render = {({location}) => (
                isLogin ? (
                    children 
                    ) : (
                    <Redirect 
                        to={{
                            pathname : "/login",
                            state    : { from : location }
                        }}
                    />
                    )
            ) }
        />
    );
}

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
                                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                    <div className="logo"> <h4>Ve Xe 2020</h4></div>
                                </div>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <div className="menu">
                                        <ul>
                                            <li>
                                                <Link to="/"><i className="fas fa-bus-alt" /><p>Vé Xe</p></Link>
                                            </li>
                                            <li>
                                                <Link to="/admin"><i className="fas fa-tv" /> <p>Phần Mềm Nhà Xe</p></Link>
                                            </li>
                                            <li>
                                                <Link to="/manager-ticket"><i className="fas fa-ticket-alt" /> <p>Quản Lý Vé</p></Link>
                                            </li>
                                            <li>
                                                <Link to="/alo2"><i className="fas fa-globe-africa" /> <p>Viet Nam</p></Link>
                                            </li>
                                            <li>
                                                <Link to="/alo3"><i className="fas fa-phone-volume" /><p>Call Now</p></Link>
                                            </li>
                                        </ul>
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
