import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/is-verified', {
          method: 'GET',
          headers: { token: localStorage.token }
        });
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    checkAuthenticated();
  });
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/login' element={!isAuthenticated ? (<Login setAuth={setAuth} {...props} />) : (<Navigate to="/dashboard" />)} />
          <Route path='/register' element={!isAuthenticated ? (<Register setAuth={setAuth} {...props} />) : (<Navigate to="/login" />)} />
          <Route path='/dashboard' element={<Dashboard setAuth={setAuth} {...props} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;