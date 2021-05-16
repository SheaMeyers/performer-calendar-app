import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import BandsList from './BandsList';
import Calendar from './Calendar';
import { store } from './BandsReduxStore';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BandsList />
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
