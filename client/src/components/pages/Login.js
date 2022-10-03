import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import '../style/Login_style.css';
import { useSelector, useDispatch } from 'react-redux';
import {checkUser, createUser}from "../functions/fullcalendar"

function Login() {
  const tempuser = useSelector(state=> ({...state}))
  const dispatch = useDispatch();
  const [ user, setUser ] = useState();
  const clientId = '288670835064-8ittcsg7le6vthmsl90m88j9aljhclf7.apps.googleusercontent.com';
  const adminid = process.env.REACT_APP_ADMINS.split(",");
//   console.log(process.env.REACT_APP_ADMINS)
//   console.log(adminid)
  var userlv = null;

  useEffect(() => {
      const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      scope: ''
        });
      };

  gapi.load('client:auth2', initClient);
  });
  
  const onSuccess = (login) => {
    var userinfo = login.profileObj;
    checkUser(userinfo)
        .then(res=> {
            const curuser = res.data;
            setUser(curuser);
        if(res.data.length == 0) {
            createUser(userinfo)
        }
        console.log("This is userinfo email")
        console.log(userinfo.email)
        console.log("This is adminid list")
        console.log("Admin Id")
        console.log(adminid)
        console.log("Here is result of includes")
        console.log(adminid.includes(userinfo.email))
        if(adminid.includes(userinfo.email)) {     
        userlv = "ADMIN"
        } else {
        userlv = "NORMAL"
        }
        dispatch({
        type:'LOGIN',
        payload: {
            user: login.profileObj,
            userlv: userlv
        }
        })
    }).catch(err => {
        console.log(err)
    })
};

const onFailure = (err) => {
    console.log('failed', err);
};

const logOut = () => {
    dispatch({
        type:'LOGOUT',
        payload: null
    })
    setUser(null);
};

return (
    <div>
        {tempuser.user ? (
            <div>
                <img src={tempuser.user.user.imageUrl} alt="" />
                <h3>User Logged in</h3>
                <p>Name: {tempuser.user.user.name}</p>
                <p>Email Address: {tempuser.user.user.email}</p>
                <br />
                <br />
                <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
            </div>
        ) : (
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with AU email"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        )}
    </div>
);
}
export default Login;