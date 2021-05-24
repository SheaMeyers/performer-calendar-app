import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import AccountSettings from './AccountSettings';
import HeaderBar from './HeaderBar';
import Home from './Home';
import UpdatePassword from './UpdatePassword';

const App = () => {
  return (
    <Router history={history}>
        <HeaderBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account-settings" exact component={AccountSettings} />
          <Route path="/update-password" exact component={UpdatePassword} />
        </Switch>
    </Router>
);
}

export default App;
