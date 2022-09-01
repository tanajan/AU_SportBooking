import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import App from './App';
import Login from './components/pages/Login'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const root = ReactDOM.createRoot(document.getElementById('root'));
// const [user, setUser] = useState(null);

// const getUser = async () => {
//   try {
//     const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
//     const { data } = await axios.get(url, { withCredentials: true });
//     setUser(data.user._json);
//   } catch (err) {
//     console.log(err);
//   }
// };

// useEffect(() => {
//   getUser();
// }, []);

root.render(
  <React.StrictMode>
    <App />
    {/* <Routes>
				<Route
					exact
					path="/"
					element={user ? <App user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
			</Routes> */}
  </React.StrictMode>
);

