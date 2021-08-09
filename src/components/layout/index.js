import { Container } from "@material-ui/core";
import React from "react";
import Header from "../header"
import Footer from "../footer"
/**
 * @author
 * @function Layout
 */

const Layout = (props) => {
    return(
        <>
            <Header />
            
            {props.children}
            
        </>
    )
}

export default Layout