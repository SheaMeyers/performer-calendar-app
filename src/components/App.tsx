import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from '../redux';
import history from "../history";
import AccountSettings from './AccountSettings';
import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
import Home from './Home';
import { PersistGate } from 'redux-persist/integration/react';
import UpdatePassword from './UpdatePassword';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
            <HeaderBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/account-settings" exact component={AccountSettings} />
              <Route path="/update-password" exact component={UpdatePassword} />
            </Switch>
            <FooterBar />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
