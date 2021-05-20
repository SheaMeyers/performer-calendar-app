import React from 'react';
import '../css/Home.css';
import { Provider } from "react-redux";
import BandsList from './BandsList';
import Calendar from './Calendar';
import HeaderBar from './HeaderBar';
import { store } from './BandsReduxStore';

const Home = () => {
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

export default Home;
