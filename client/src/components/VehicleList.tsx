import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import VehicleDisplay from './VehicleDisplay';
import VehicleModel from '../Models/VehicleModel';

export interface Props {
  allVehicles: VehicleModel[],
  updateVehicles: Function,
  newVehicle: Function,
  handleSelection: Function;
}

class VehicleList extends Component<Props, {}> {
  render() {
    const vehicles = this.props.allVehicles !== undefined || null ? this.props.allVehicles.map((vehicle) => {
      return <VehicleDisplay vehicle={vehicle} id={vehicle._id} updateVehicle={this.props.updateVehicles} handleSelection={this.props.handleSelection}/>
    }) : <p>No vehicles</p>
    return (
      <div>
        <ol>
          {vehicles}
          <li>
            <button type="button" onClick={() => this.props.newVehicle}>New Vehicle</button>
          </li>
        </ol>
      </div>
    );
  }
}

export default VehicleList;