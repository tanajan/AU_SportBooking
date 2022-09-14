import React, {useState,useEffect} from 'react'
import {Routes, Navigate, BrowserRouter, Route} from 'react-router-dom'
import "./App.css";

// ---Pages----
import Index from "./components/pages/index";
import Login from "./components/pages/Login";
import MainNav from './components/Nav/MainNav';
import Dashboard from "./components/pages/dashboard";
import SportSelection from "./components/pages/sportSelection";

function App() {

  const [ profile, setProfile ] = useState();

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
      <Route path="/home" element={<SportSelection/>}/>
      <Route path="/bookings" element={<Index />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
