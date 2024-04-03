import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        console.log(pathname);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 0);
    }, [pathname])
}

export default ScrollTop