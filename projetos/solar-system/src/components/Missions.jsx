import React from 'react';
import Title from './Title';
import MissionCard from './MissionCard';
import missions from '../data/missions';

class Missions extends React.Component {
  render() {
    return (
      <div data-testid="missions">
        <Title headline="Missions" />
        <section className="missions-container">
          {
            missions.map((mission) => 
              <MissionCard name={mission.name} year={mission.year} country={mission.country} destination={mission.destination}/>
            )
          }
        </section>
      </div>
    )
  }
}

export default Missions;
