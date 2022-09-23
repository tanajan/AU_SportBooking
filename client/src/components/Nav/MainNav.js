import React from "react";
import { GoogleLogout } from 'react-google-login';
import { NavLink } from 'react-router-dom'
import './MainNav.css'
import { useSelector, useDispatch } from 'react-redux'
const MainNav = () => {

    const {user} = useSelector(state=> ({...state}))
    const clientId = '288670835064-8ittcsg7le6vthmsl90m88j9aljhclf7.apps.googleusercontent.com';
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch({
            type:'LOGOUT',
            payload: null
        })
    };

    return (

    <header className="main-nav">
        <div className="main-nav-logo">
            <h1>AU Sport Booking </h1>
        </div>
        <div className="main-nav-button">
            <ul>
                <li><NavLink to="/login">Home</NavLink></li>
                <li><NavLink to="/home">Start Booking</NavLink></li>
                {user ?<>{user.userlv == "ADMIN" ? <li><NavLink to="/dashboard">Dashboard</NavLink></li> : <></>}</> : <></>}
                

            </ul>
        </div>
            { user?
            <div className="right-nav-button">
                <h1 >{user.givenName}</h1>
                <div >
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            </div>
            : 'Welcome'
            }
            
    </header>
    )
}

export default MainNav;