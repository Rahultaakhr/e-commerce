import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <div>
        <NavBar/>
        <div className="main-content min-h-screen">
            {children}
        </div>
        <Footer/>
    </div>
    );
}

export default Layout;