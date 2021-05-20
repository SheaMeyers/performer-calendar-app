import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import AccountSettings from './AccountSettings';
import Home from './Home';
import UpdatePassword from './UpdatePassword';

const App = () => {
  return (
    <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account-settings" exact component={AccountSettings} />
          <Route path="/update-password" exact component={UpdatePassword} />
        </Switch>
    </Router>
);
}

export default App;
