import axios from 'axios';
import React,{useEffect} from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Menu from './Menu';
import ContentWrapper from './ContentWrapper';
import { submitCheckIsUserLogin } from '../../services/actions/dashboard';
export default function Dashboard() {
    const dispatch = useDispatch();
    const {
        userIsLogged,
        userInof,
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if(!userIsLogged.isLoggend){
            dispatch(submitCheckIsUserLogin())
        }
    }, [])

    if(true){
        return (
            <>
            <Menu/>
            <ContentWrapper/>
            </>
        )
    }else{
        return <Redirect to='/login'  />
    }
}
