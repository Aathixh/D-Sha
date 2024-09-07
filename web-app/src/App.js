import React, { useState } from 'react';
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