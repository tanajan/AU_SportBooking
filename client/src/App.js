import Index from "./components/pages/index"
import Login from "./components/pages/Login"
import React, {useState,useEffect} from 'react'
import {Routes, Navigate, BrowserRouter, Route} from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import MainNav from './components/Nav/MainNav';
import "./App.css";

function App() {

  const [ profile, setProfile ] = useState();

  const clientId = '288670835064-8ittcsg7le6vthmsl90m88j9aljhclf7.apps.googleusercontent.com';

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
      setProfile(res.profileObj);
    };
  
    const onFailure = (err) => {
      console.log('failed', err);
    };
  
  const logOut = () => {
      setProfile(null);
  };
  useEffect(() => {
    document.title = 'AU Sport Booking'
  }, [])

  return (
    <BrowserRouter>
    <MainNav />
    <br/>
    <main className="main-content">
    <Routes basename = '/'>
      <Route from="/" to ="/login" exact />
      <Route path="/bookings" element={<Index />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </main>
    {/* <div className="App">
      <main>
      {profile ? (
        <div>
          <Index />
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
      ) }
      </main>
      
    </div> */}
    </BrowserRouter>
  );
}

export default App;
