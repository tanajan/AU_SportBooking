import React from "react";
import vmslogo from "../image/vms-logo.png";
import './vmsfooter.css'
const Footer = () => {
    return (
        <footer>
            <div className="main-footer">
                <div className='footer-text'>
                    <h1>This website created by students of</h1>
                </div>
                <div className='footer-pic'>
                    <a href="https://vms.au.edu/">
                        <img alt="vmslogo" src={vmslogo} style={{ width: '300px', padding: '8px', textAlign: 'center' }} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;