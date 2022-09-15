import React from "react";
import { NavLink } from 'react-router-dom'
import './MainNav.css'
const mainNav = () => (
    <header className="main-nav">
        <div className="main-nav-logo">
            <h1>AU Sport Booking </h1>
        </div>
        <div className="main-nav-button">
            <ul>
                <li><NavLink to="/login">Home</NavLink></li>
                <li><NavLink to="/home">Start Booking</NavLink></li>
                {/* <li><NavLink to="/bookings">Bookings</NavLink></li> */}
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </ul>
        </div>
    </header>
)

export default mainNav;