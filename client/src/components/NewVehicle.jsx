import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: 0,
      jobs: []
    }
  }

  /**
   * 
   * @param {Event} e event args
   */
  handleInput(e) {

  }

  render() { 
    return (
      <li>
        <div>
          <p>New Vehicle</p>
          <p>Make:</p>
          <input id="make" type="text" onChange={this.handleInput} />
          <input id="model" type="text" onChange={this.handleInput} />
          <input id="year" type="number" onChange={this.handleInput} />
        </div>
      </li>
    );
  }
}
NewVehicle.propTypes = {
  handleNew: PropTypes.func.isRequired,
};

export default NewVehicle;