import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Wellcome from './pages/Wellcome';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import CreateMonitor from './pages/CreateMonitor';
import MonitoredEnvironmente from './pages/MonitoredEnvironment';
import Report from './pages/Report';
import UpdateLeito from './pages/UpdateLeito';
import Users from './pages/Users';
import Settings from './pages/Settings';

import Account from './pages/Account';
import  Login  from './pages/Login';
import Notifications from './pages/Notifications';
//import RequireAuth from './services/requireAuth';

function App() {
  return (
    <div className="App">
      <Navbar />
       <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/wellcome" element={[<Layout/>,<Wellcome/>]}/> 
          <Route path="/novo-monitoramento" element={[<Layout/>,<CreateMonitor/>]}/>
            <Route path="/monitor" element={[<Layout/>,<MonitoredEnvironmente/>]}/>
            <Route path="/report" element={[<Layout/>,<Report/>]}/>
            <Route path="/users" element={[<Layout/>,<Users/>]}/>
            <Route path="/setting" element={[<Layout/>,<Settings/>]}/>
            <Route path="/notification" element={[<Layout/>,<Notifications/>]}/>
            <Route path="/leitoform-update/:id" element={[<Layout/>,<UpdateLeito/>]}/>
            <Route path="/users-update" element={[<Layout/>,<Account/>]}/>
          

       </Routes>
    </div>
  );
}

export default App;
/*<Route element={<RequireAuth/>}> </Route>*/