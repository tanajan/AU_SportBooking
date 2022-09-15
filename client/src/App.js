import React, {useState,useEffect} from 'react'
import {Routes, Navigate, BrowserRouter, Route} from 'react-router-dom'
import "./App.css";
import { useSearchParams } from 'react-router-dom';

// ---Pages----
import Index from "./components/pages/index";
import Login from "./components/pages/Login";
import MainNav from './components/Nav/MainNav';
import Dashboard from "./components/pages/dashboard";
import SportSelection from "./components/pages/sportSelection";

// -----Protected-----
import ProtectedRoute from "./components/functions/protectedRoute";

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
      <Route index element={<Login setProfile={setProfile}/>} />
      <Route path="/login" element={<Login setProfile={setProfile}/>}/>
      <Route path="/home" element={<ProtectedRoute user={profile}><SportSelection/></ProtectedRoute>}/>
      <Route path="/bookings" element={<ProtectedRoute user={profile}><Index /></ProtectedRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute user={profile}><Dashboard /></ProtectedRoute>}/>
    </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
