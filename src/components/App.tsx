import React from 'react';
import { Provider } from "react-redux";
import { store, persistor } from '../redux';
import HeaderBar from './HeaderBar';
import Home from './Home';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HeaderBar />
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
