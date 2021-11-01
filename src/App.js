import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './screens/Main';
import Welcome from './screens/Welcome';
import EnterRoom from './screens/EnterRoom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/room/:roomID" component={Main} />
        <Route path="/enter/:roomID" component={EnterRoom} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
