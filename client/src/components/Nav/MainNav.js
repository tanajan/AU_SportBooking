import React from "react";
import { GoogleLogout } from 'react-google-login';
import { NavLink } from 'react-router-dom'
import './MainNav.css'
import { useSelector, useDispatch } from 'react-redux'
import sportlogo from "../image/Sportlogo.png";

const MainNav = () => {

    const { user } = useSelector(state => ({ ...state }))
    const clientId = '288670835064-8ittcsg7le6vthmsl90m88j9aljhclf7.apps.googleusercontent.com';
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
    };

    return (
        <header className="main-nav">
            <div className="main-nav-logo">
                <img alt="abaclogo" src={sportlogo} style={{ width: '75px', height: '75px', padding: '8px', textAlign: 'center' }} />
                <h1>Sport Reservation </h1>
            </div>
            <div className="main-nav-button">
                {!user ?
                    <ul>
                        <li><NavLink to="/login">Homepage</NavLink></li>
                    </ul>
                    : <><ul>
                        <li><NavLink to="/login">Home</NavLink></li>
                        <li><NavLink to="/home">Start Booking</NavLink></li>
                        {user ? <>{user.userlv == "ADMIN" ? <>
                            <li><NavLink to="/bookinglist">Booking List</NavLink></li>
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        </>
                            : <></>}</> : <></>}
                    </ul></>
                }

            </div>
            {user ?
                <div className="right-nav-button">
                    <h1 >{user.givenName}</h1>
                    <div>
                        <GoogleLogout render={renderProps => (
                            <button onClick={renderProps.onClick} style={{
                                width: 75, height: 40, borderRadius: '8px', border: 'gray'
                            }}>Logout</button>
                        )} clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                    </div>
                </div>
                : <></>
            }

        </header>
    )
}

export default MainNav;