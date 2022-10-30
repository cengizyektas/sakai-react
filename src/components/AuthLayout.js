import React from "react";
import {Redirect, Outlet} from 'react-router-dom'
import { useIsLoggedIn } from "./hooks";

export default function AuthLayout (){

    const isLoggedIn = useIsLoggedIn();
    console.log("isLoggedIn",isLoggedIn);
    if(isLoggedIn == null) return <h2>loading</h2>;
    else if(isLoggedIn == true) return <Redirect replace to="/" />;
    // <Outlet/>
}