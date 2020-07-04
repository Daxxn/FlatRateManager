import React, { Component, ChangeEvent } from 'react';
// import PropTypes from 'prop-types';
import VehicleDisplay from './VehicleDisplay';
import VehicleModel from '../../Models/VehicleModel';
import JobModel from '../../Models/JobModel';
import { UpdateJobsFunction } from '../MainPage';

export interface Props {
  allVehicles: VehicleModel[],
  updateVehicles: (e: ChangeEvent<HTMLInputElement>, vehicleId: string) => void;
  updateJobs: UpdateJobsFunction;
  newVehicle: () => void,
  newJob: (Vehicle: VehicleModel) => void;
  handleSelection: (id: string) => void;
}

class VehicleList extends Component<Props, {}> {
  render() {
    const vehicles = this.props.allVehicles !== undefined || null ? this.props.allVehicles.map((vehicle) => {
      return <VehicleDisplay
        vehicle={vehicle}
        updateVehicle={this.props.updateVehicles}
        updateJob={this.props.updateJobs}
        handleSelection={this.props.handleSelection}
        newJob={this.props.newJob}/>
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

export default VehicleList;
