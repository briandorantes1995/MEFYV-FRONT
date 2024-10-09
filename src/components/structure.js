import Navbar from "./ui/Navbar";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

export const MenuLayout = () => (
    <>
        <Navbar/>
        <Outlet />
    </>
);

export const RequireAuth = ({children})=>{
    const user = useSelector((state) => state.user.value);
    if(!user){
        return <Navigate to="/Login"/>;
    }
    return children
};