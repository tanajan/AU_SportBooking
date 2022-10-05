import React, { useEffect } from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import "./App.css";
import background from "./components/image/bgi.png";

// ---Pages----
import Index from "./components/pages/index";
import Login from "./components/pages/Login";
import MainNav from './components/Nav/MainNav';
import Dashboard from "./components/pages/dashboard";
import SportSelection from "./components/pages/sportSelection";

// -----Protected-----
import ProtectedRoute from "./components/functions/protectedRoute";

// ----- State management
import { useSelector } from 'react-redux';


function App() {

  const tempuser = useSelector(state => ({ ...state }))

  useEffect(() => {
    document.title = 'AU Sport Booking'
  }, [])

  const styles = {
    header: {
      backgroundImage: `url(${background})`,
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100vw'
    },

    content: {
      zIndex: 'auto',
      margin: 0,
      padding: 0,
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      width: "100vw",
      height: "100vh",
      // position: "absolute",
      maxHeight: "60vh"
    }
  }
  return (
    <div>
      <BrowserRouter>
        <MainNav />
        <br />
        <main className="main-content">
          <div style={styles.header}>
            <div className='main-con' style={styles.content}>
              <Routes basename='/'>
                <Route from="/" to="/login" exact />
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<ProtectedRoute user={tempuser.user}><SportSelection /></ProtectedRoute>} />
                <Route path="/bookings" element={<ProtectedRoute user={tempuser.user}><Index /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute user={tempuser.user}><Dashboard /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
