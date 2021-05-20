import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Home from './Home';

const App = () => {
  return (
    <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
    </Router>
);
}

export default App;
