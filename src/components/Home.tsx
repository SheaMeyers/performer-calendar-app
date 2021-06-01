import React from 'react';
import PerformerList from './PerformerList';
import Calendar from './Calendar';
import '../css/Home.css';


const Home = () => {
  return (
      <div className="Home">
        <PerformerList />
        <Calendar />
      </div>
  );
}

export default Home;
