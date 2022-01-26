import React from "react";

class MissionCard extends React.Component {
  render() {
    return (
      <div data-testid="missions-card" class="mission-card">
        <h3 data-testid="missions-name"> { this.props.name } </h3>
        <ul>
          <li data-testid="mission-year"> { this.props.year } </li>
          <li data-testid="mission-country"> { this.props.country } </li>
          <li data-testid="mission-destination"> { this.props.destination } </li>
        </ul>
      </div>
    )
  }
}

export default MissionCard;
