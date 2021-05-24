import React from 'react';
import '../css/Home.css';
import { Provider } from "react-redux";
import BandsList from './BandsList';
import Calendar from './Calendar';
import { store } from './BandsReduxStore';

const Home = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BandsList />
        <Calendar />
      </div>
    </Provider>
  );
}

export default Home;
