import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import '../style/Login_style.css';
import { createSearchParams, Link, useNavigate, Navigate } from 'react-router-dom'


function Login({setProfile}) {
  const [ user, setUser ] = useState();

  const clientId = '288670835064-8ittcsg7le6vthmsl90m88j9aljhclf7.apps.googleusercontent.com';
  const navigate = useNavigate();

  useEffect(() => {
      const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      scope: ''
        });
      };
  gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    setUser(res.profileObj);
    setProfile(res.profileObj);
};

const onFailure = (err) => {
    console.log('failed', err);
};

const logOut = () => {
    setProfile(null);
    setUser(null);
};

return (
    <div>
        {user ? (
            <div>
                <img src={user.imageUrl} alt="user image" />
                <h3>User Logged in</h3>
                <p>Name: {user.name}</p>
                <p>Email Address: {user.email}</p>
                <p>Member ID: {user.email.slice(0,8)}</p>
                <br />
                <br />
                <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
            </div>
        ) : (
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
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