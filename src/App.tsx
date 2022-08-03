import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Link, Route, useLocation } from "react-router-dom";
import './App.css';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { ShowReq } from './components/ShowReq';
import { ShowRes } from './components/ShowRes';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/sign-up'} element={<SignUp />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
      {location.pathname !== '/' && <Link to={'/'}>Home</Link>}
      <br/>
      <br/>
      <br/>
      <br/>
      <hr/>
      <ShowReq/>
      <ShowRes/>
    </div>
  );
}

export default App;
