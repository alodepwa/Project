import React, { Component } from 'react'
import { useSelector  } from 'react-redux';
import {
    Route,
    Redirect
} from "react-router-dom";

export default function PrivateRoute({children, ...rest}){
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
