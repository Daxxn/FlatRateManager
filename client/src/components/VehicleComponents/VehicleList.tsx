import React, { Component, ChangeEvent } from 'react';
// import PropTypes from 'prop-types';
import VehicleDisplay from './VehicleDisplay';
import VehicleModel from '../../Models/VehicleModel';
import JobModel from '../../Models/JobModel';

export interface Props {
  allVehicles: VehicleModel[],
  selectVehicleIndex: number;
  selectJobIndex: number;
  updateVehicles: (e: ChangeEvent<HTMLInputElement>, vehicleId: string) => void;
  updateJobs: (e: ChangeEvent<HTMLInputElement>, vehicle: VehicleModel, job: JobModel) => void;
  newVehicle: () => void,
  newJob: (Vehicle: VehicleModel) => void;
  handleVehicleSelect: (vehI: number) => void;
  handleJobSelect: (jobI: number) => void;
}

class VehicleList extends Component<Props, {}> {
  render() {
    const {
      allVehicles,
      selectJobIndex,
      selectVehicleIndex,
      updateVehicles,
      updateJobs,
      handleVehicleSelect,
      handleJobSelect,
      newJob,
      newVehicle
    } = this.props;

    const vehicles = allVehicles !== undefined || null ? allVehicles.map((vehicle, ind) => {
      return <VehicleDisplay
        selJobIndex={selectJobIndex}
        index={ind}
        vehicle={vehicle}
        updateVehicle={updateVehicles}
        updateJob={updateJobs}
        newJob={newJob}
        handleVehicleSelect={handleVehicleSelect}
        handleJobSelect={handleJobSelect}
        style={selectVehicleIndex === ind ? 'itemSelected' : 'item'}
      />
    }) : <p>No vehicles</p>
    return (
      <div>
        <ol>
          {vehicles}
          <li>
            <button type="button" onClick={newVehicle}>New Vehicle</button>
          </li>
        </ol>
      </div>
    );
  }
}

export default VehicleList;
