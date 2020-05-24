import React from 'react';
import Avatar from '@material-ui/core/Avatar';
// import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './../PrivateRoute';
import LayoutLogin from './LayoutLogin';
import LayoutCreateUsers from './LayoutCreateUsers';
import LayoutListUsers from './LayoutListUsers';
import LayoutCreateCar from './LayoutCreateCar';
import LayoutListCar from './LayoutListCar';
import LayoutListTrips from './LayoutListTrips';
import LayoutCreatePost from './LayoutCreatePost';
import LayoutListPost from './LayoutListPost';
import LayoutDashboard from './LayoutDashboard';
import LayoutProfile from './LayoutProfile';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    HashRouter,
    withRouter,
    useHistory,
    useLocation,
    Redirect,

} from "react-router-dom";
import {
    useWindowWidth,
} from '@react-hook/window-size'
export default function LayoutHomeAdmin() {
    const width = useWindowWidth();
    const user_name_login = sessionStorage.getItem('tokens') ? JSON.parse(sessionStorage.getItem('tokens')).Admin_Name : '';
    const user_role_login = sessionStorage.getItem('tokens') ? JSON.parse(sessionStorage.getItem('tokens')).Roles_Id : '';
    return (
        <HashRouter>
            <div className="admin">
                {
                    width < 950 && (<button className="btn toggleBtnMenu " type="button">
                        <span><i className="fas fa-bars"></i></span>
                    </button>)
                }
                <div className="row">

                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2 admin-left" style={width < 950 ? { display: 'none' } : { display: 'initial' }}>
                        {/* <div className="navbar navbar-expand-lg d-flex justify-content-end adminHome"> */}
                        {/* <div className="navbar-collapse collapse" id="content"> */}
                        <ul className="block-menu nav-link" style={{ width: '110%' }}>
                            <li className="">
                                <a href="#" className="row menu-toggle">
                                    <span className="iconAvatar col-1"><Avatar src="https://cdn4.iconfinder.com/data/icons/people-std-pack/512/boss-512.png" /></span>
                                    <span className="col-7"><p>{user_name_login}</p></span>
                                    <span className="col-2 ">
                                        <i className="fas icon-toggle fa-chevron-down hide-icon" />
                                        <i className="fas icon-toggle  fa-chevron-right" />
                                    </span>
                                </a>
                                <ul className="menu-child menu-child-toggle">
                                    <li className="mb-3 link nav-link">
                                        <Link to="/login" className="ml-4">Đăng Xuất</Link>
                                    </li>
                                    <li className="mb-3 link nav-link">
                                        <Link to="/admin/profile" className="ml-4">Thông tin <br />tài khoản</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="">
                                <Link to="/admin" className="row menu-toggle">
                                    <span className="col-1"><i className="fas fa-home"></i></span>
                                    <span className="col-7"><p> Trang Chủ</p></span>
                                    <span className="col-2"></span>
                                </Link>
                            </li>
                            {
                                (user_role_login == 1 || user_role_login == 2) && (
                                    <li className="">
                                        <a href="#" className="row menu-toggle">
                                            <span className="col-1"><i className="fas fa-user"></i></span>
                                            {
                                                user_role_login == 1 ? (<span className="col-7 "><p> Khách Hàng</p></span>) : (<span className="col-7"><p> Nhân Viên</p></span>)
                                            }
                                            <span className="col-2 ">
                                                <i className="fas icon-toggle fa-chevron-down hide-icon" />
                                                <i className="fas icon-toggle  fa-chevron-right" />
                                            </span>
                                        </a>
                                        <ul className="menu-child menu-child-toggle">
                                            {
                                                (user_role_login == 1) ? (
                                                    <li className="nav-link link">
                                                        <Link to="/admin/create-user" className="ml-4"><p>Tạo Khách Hàng</p></Link>
                                                    </li>
                                                ) :
                                                    user_role_login == 2 ? (
                                                        <li className="nav-link link">
                                                            <Link to="/admin/create-user" className="ml-4"><p>Tạo Nhân Viên</p></Link>
                                                        </li>
                                                    ) : null
                                            }
                                            {
                                                (user_role_login == 1) ? (
                                                    <li className="nav-link link">
                                                        <Link to="/admin/list-users" className="ml-4 "><p>Danh Sách <br /> Khách Hàng</p></Link>
                                                    </li>
                                                ) :
                                                    user_role_login == 2 ? (
                                                        <li className="nav-link link">
                                                            <Link to="/admin/list-users" className="ml-4 "><p>Danh Sách <br /> Nhân Viên</p></Link>
                                                        </li>
                                                    ) : null
                                            }

                                        </ul>
                                    </li>
                                )
                            }

                            {
                                user_role_login == 1 ? null : (
                                    <li className="">
                                        <a href="#" className="row menu-toggle">
                                            <span className="col-1"><i className="fas fa-car"></i></span>
                                            <span className="col-7"><p>Xe Khách</p></span>
                                            <span className="col-2">
                                                <i className="fas icon-toggle fa-chevron-down hide-icon" />
                                                <i className="fas icon-toggle  fa-chevron-right" />
                                            </span>
                                        </a>
                                        <ul className="menu-child menu-child-toggle">
                                            {
                                                user_role_login == 2 ? (
                                                    <li className="nav-link link">
                                                        <Link to="/admin/create-car" className="ml-4"><p>Tạo Xe</p></Link>
                                                    </li>
                                                ) :
                                                    user_role_login == 2 ? (
                                                        <li className="nav-link link">
                                                            <Link to="/admin/create-user" className="ml-4"><p>Tạo Nhân Viên</p></Link>
                                                        </li>
                                                    ) : null
                                            }
                                            {
                                                user_role_login != 1 ? (
                                                    <li className="nav-link link">
                                                        <Link to="/admin/list-cars" className="ml-4 "><p>Danh Sách Xe</p></Link>
                                                    </li>
                                                ) : null
                                            }

                                        </ul>
                                    </li>
                                )
                            }
                            {
                                user_role_login == 1 ? null : (
                                    <li className="">
                                        <a href="#" className="row menu-toggle">
                                            <span className="col-1"><i className="fas fa-map-marker-alt"></i></span>
                                            <span className="col-7"><p> Tuyến Đi</p></span>
                                            <span className="col-2">
                                                <i className="fas icon-toggle fa-chevron-down hide-icon" />
                                                <i className="fas icon-toggle  fa-chevron-right" />
                                            </span>
                                        </a>
                                        <ul className="menu-child menu-child-toggle">
                                            <li className="nav-link link">
                                                <Link to="/admin/list-trips" className="ml-4 "><p>Danh Sách <br /> Tuyến</p></Link>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }
                            <li className="">
                                <a href="#" className="row menu-toggle">
                                    <span className="col-1"><i className="fas fa-mail-bulk"></i></span>
                                    <span className="col-7"><p>Bài Viết</p></span>
                                    <span className="col-2">
                                        <i className="fas icon-toggle fa-chevron-down hide-icon" />
                                        <i className="fas icon-toggle  fa-chevron-right" />
                                    </span>
                                </a>
                                <ul className="menu-child menu-child-toggle">
                                    {
                                        user_role_login != 2 ? null : (
                                            <li className="nav-link link">
                                                <Link to="/admin/create-post" className="ml-4 "><p>Tạo Bài Viết</p> </Link>
                                            </li>
                                        )
                                    }
                                    <li className="nav-link link">
                                        <Link to="/admin/list-posts" className="ml-4 link"><p>Danh Sách <br /> Bài Viết</p></Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {/* </div> */}

                        {/* </div> */}
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10 admin-right">
                        <div className="content">
                            <Switch>
                                <Route path="/admin/logout">
                                    <LayoutLogin />
                                </Route>
                                <PrivateRoute exact path="/admin">
                                    <LayoutDashboard />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/create-user">
                                    <LayoutCreateUsers />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/list-users">
                                    <LayoutListUsers />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/create-car">
                                    <LayoutCreateCar />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/list-cars">
                                    <LayoutListCar />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/list-trips">
                                    <LayoutListTrips />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/create-post">
                                    <LayoutCreatePost />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/list-posts">
                                    <LayoutListPost />
                                </PrivateRoute>
                                <PrivateRoute path="/admin/profile">
                                    <LayoutProfile />
                                </PrivateRoute>
                            </Switch>
                        </div>
                    </div>
                </div>

            </div>

        </HashRouter >
    )
}
