import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VehicleDisplay from './VehicleDisplay';

class VehicleList extends Component {
  render() {
    const vehicles = this.props.allVehicles !== undefined || null ? this.props.allVehicles.map((vehicle) => {
      return <VehicleDisplay vehicle={vehicle} id={vehicle._id} updateVehicle={this.props.updateVehicles}/>
    }) : <p>No vehicles</p>
    return (
      <div>
        <ol>
          {vehicles}
          <li>
            <button type="button" onClick={this.props.newVehicle}>New Vehicle</button>
          </li>
        </ol>
      </div>
    );
  }
}
VehicleList.propTypes = {
  allVehicles: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateVehicles: PropTypes.func.isRequired,
  newVehicle: PropTypes.func.isRequired,
};

export default VehicleList;