import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Link, Route, useLocation } from "react-router-dom";
import './App.css';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { ShowReq } from './components/ShowReq';
import { ShowRes } from './components/ShowRes';
import { CommonData } from './components/types';

function App() {
  const location = useLocation();
  const [lastReq, setLastReq] = useState({});
  const [lastRes, setLastRes] = useState({});

  const common: CommonData = {
    setLastReq,
    setLastRes,
  };

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/sign-up'} element={<SignUp {...common}/>} />
        <Route path={'/login'} element={<Login {...common}/>} />
      </Routes>
      {location.pathname !== '/' && <Link to={'/'}>Home</Link>}
      <br/>
      <br/>
      <br/>
      <br/>
      <hr/>
      <ShowReq {...{ req: lastReq }}/>
      <ShowRes {...{ res: lastRes }}/>
    </div>
  );
}

export default App;
