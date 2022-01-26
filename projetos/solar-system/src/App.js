import React from 'react';
import Header from './components/Header'; 
import SolarSystem from './components/SolarSystem';
import Missions from './components/Missions';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.setState = {
      oi: 'oi',
    }
  }


  displayOi = () => {
    this.setState({ ola: 'ola' });
  }
  render() {
    this.displayOi();
    return (
      <>
        <Header />
        <SolarSystem />
        <Missions />
      </>
    );
  }
}

export default App;
