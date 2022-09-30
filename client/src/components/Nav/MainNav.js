import React from "react";
import { GoogleLogout } from 'react-google-login';
import { NavLink } from 'react-router-dom'
import './MainNav.css'
import { useSelector, useDispatch } from 'react-redux'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd'

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
                <h1>AU Sport Booking </h1>
            </div>
            <div className="main-nav-button">
                {!user ?
                    <ul>
                        <li><NavLink to="/login">Homepage</NavLink></li>
                    </ul>
                    : <><ul>
                        <li><NavLink to="/login">Home</NavLink></li>
                        <li><NavLink to="/home">Start Booking</NavLink></li>
                        {user ? <>{user.userlv == "ADMIN" ? <li><NavLink to="/dashboard">Dashboard</NavLink></li> : <></>}</> : <></>}
                    </ul></>
                }

            </div>
            {user ?
                <div className="right-nav-button">
                    <h1 >{user.givenName}</h1>
                    <div>
                        <GoogleLogout render={renderProps => (
                            <button onClick={renderProps.onClick} style={{width:75, height:40,borderRadius: '8px',border:'gray'
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