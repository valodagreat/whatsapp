import React from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import SideBar from './components/SideBar/SideBar';
import {Route,Switch,BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login/Login';
import { useStateValue } from './StateProviders/StateProvider';

function App() {
  
  const [{user},] = useStateValue(null);

  return (
    <div className="app">
      {!user ? (
        <Login />
      )
      :(<div className="app_body">
        <Router>
          <SideBar />
          <Switch>
              <Route exact path="/rooms/:roomId">
                  <Chat  />
              </Route>
              <Route exact path="/app" >
                {<Chat  />}
              </Route>
          </Switch>
        </Router>
      </div>)}
    </div>
  );
}

export default App;
