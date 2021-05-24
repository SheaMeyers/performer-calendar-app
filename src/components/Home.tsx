import React from 'react';
import PerformerList from './PerformerList';
import Calendar from './Calendar';
import '../css/Home.css';


const Home = () => {
  return (
      <div className="App">
        <PerformerList />
        <Calendar />
      </div>
  );
}

export default Home;
