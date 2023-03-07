import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus';

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus();
    if(checkingStatus){
        return <img src="./images/giphy.gif" alt=""
        className="pt-20 md:w-[30%] lg:w-[20%] mb-12 md:mb-6 md:m-auto rounded-full "
        />
    }
  return  loggedIn ? <Outlet/> : <Navigate to="/sign-in"/>
}
