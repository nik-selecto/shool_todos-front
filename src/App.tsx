import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Link, Route, useLocation, Navigate } from "react-router-dom";
import './App.css';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { ShowReq } from './components/ShowReq';
import { ShowRes } from './components/ShowRes';
import { CommonData, User } from './components/types';
import { Logger } from './components/Logger';
import { Logout } from './components/Logout';
import { Todos } from './components/Todos';
import { Settings } from './components/Settings';

function App() {
  const location = useLocation();
  const [lastReq, setLastReq] = useState({});
  const [lastRes, setLastRes] = useState({});
  const [logs, _setLogs] = useState<string[]>([]);
  const [user, setUser] = useState<null | User>(null);
  const [background, setBackground] = useState('yellow');
  const setLogs = (data: string) => _setLogs([data, ...logs]);

  const common: CommonData = {
    setLastReq,
    setLastRes,
    setUser,
    setLogs,
    user,
  };

  return (
    <div className="App">

      <div id='content-div' style={{
        backgroundColor: background,
      }}>
        <Routes>
          <Route path={'/'} element={<Home {...common} />} />
          <Route path={'/settings'} element={<Settings {...{
            ...common, background, setBackground
          }} />} />
          {(user ? [
          ] : [
            <Route path={'/sign-up'} element={<SignUp {...common} />} />,
            <Route path={'/login'} element={<Login {...common} />} />,
            <Route path={'/todos'} element={<Todos {...common} />} />,
          ].map((el, i) => ({ ...el, key: i })))}
        </Routes>

        {location.pathname !== '/' && <Link to={'/'}>Home</Link>}
        {user && (location.pathname !== '/settings') && <><br/><Link to={'/settings'}>Settings</Link></>}
        {(user ? [
          <Logout {...common} />
        ] : [

        ])}
      </div>
      <hr />
      <ShowReq {...{ req: lastReq }} />
      <ShowRes {...{ res: lastRes }} />
      <Logger {...{ logs }} />
      {user && <p>Current user: {JSON.stringify(user)}</p>}
    </div>
  );
}

export default App;
