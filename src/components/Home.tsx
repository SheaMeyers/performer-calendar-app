import React from 'react';
import BandsList from './BandsList';
import Calendar from './Calendar';
import '../css/Home.css';


const Home = () => {
  return (
      <div className="App">
        <BandsList />
        <Calendar />
      </div>
  );
}

export default Home;
