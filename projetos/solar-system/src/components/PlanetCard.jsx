import React from 'react';

class PlanetCard extends React.Component {
  render() {
    return (
      <div data-testid="planet-card" class="planet-card">
        <h3 data-testid="planet-name"> { this.props.planetName } </h3>
        <img data-testid="planetImage" id={ this.props.planetName }src={ this.props.planetImage } alt={ `Planeta ${this.props.planetName}`} />
      </div>
    )
  }
}

export default PlanetCard;
