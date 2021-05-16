import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import BandsList from './BandsList';
import Calendar from './Calendar';
import HeaderBar from './HeaderBar';
import { store } from './BandsReduxStore';

function App() {
  return (
    <Provider store={store}>
      <HeaderBar />
      <div className="App">
        <BandsList />
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
