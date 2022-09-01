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
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
        </div>
    </header>
)

export default mainNav;