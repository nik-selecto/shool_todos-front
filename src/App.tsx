import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Link, Route, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  const [lastReq, setLastReq] = useState({});
  const [lastRes, setLastRes] = useState({});
  const [logs, _setLogs] = useState<string[]>([]);
  const [user, setUser] = useState<null | User>(null);
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
      {user ? <p>You entered as: <pre>{JSON.stringify(user)}</pre></p> : <p>Are you first time here?</p>}
      <Logout {...common} />
      <Routes>
        <Route path={'/'} element={<Home {...common} />} />
        {(!user ? [
          <Route path={'/sign-up'} element={<SignUp {...common} />} />,
          <Route path={'/login'} element={<Login {...common} />} />,
          <Route path={'/todos'} element={<Todos {...common} />} />,
        ] : [])}
      </Routes>
      {location.pathname !== '/' && <Link to={'/'}>Home</Link>}
      <br />
      <br />
      <br />
      <br />
      <hr />
      <ShowReq {...{ req: lastReq }} />
      <ShowRes {...{ res: lastRes }} />
      <Logger {...{ logs }} />
    </div>
  );
}

export default App;
