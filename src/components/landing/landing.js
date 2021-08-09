import React from 'react'
import Layout from '../layout'
import "./landing.css"
import { Link } from 'react-router-dom'



function Landing(props) {
    return (
        <Layout>
            <div style={{display:"flex",marginTop:"6%", overflow:"hidden"}}>
                <div className="title1">
                    <h1 style={{fontSize:"64px", lineHeight:"76px",textAlign:"left",marginLeft:"20%"}}>Begin your selling journey on AmazeKart</h1>
                    <h2 style={{textAlign:"left",marginLeft:"20%"}}>Sell your products to the crores of customers across India</h2>
                    <button className="button">Start Selling</button>
                </div>
                <div className="imageclass"> 
                    <img className="imagessell" src="./images/seller.png" />
                </div>
                </div>
                <div className="svgcontainer" style={{marginTop:"4%"}}>
                    <svg className="lsvg" viewBox="0 0 500 500"
                        preserveAspectRatio="xMinYMin meet">
                        <path d="M0, 150 C200, 250 400,
                                0 550, 150 L550, 00 L0, 0 Z"
                            style={{ stroke: "none", fill: "dodgerblue" }}>
                        </path>
                    </svg>
                </div>
            
        </Layout>

    )
}

export default Landing