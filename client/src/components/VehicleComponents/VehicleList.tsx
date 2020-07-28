import React from 'react';
import VehicleModel from '../../Models/VehicleModel';
import VehicleDisplay from './VehicleDisplay';
import JobModel from '../../Models/JobModel';
import AddVehicleButton from './AddVehicleButton';

export interface VehicleListProps {
  vehicles: VehicleModel[] | null;
  allJobs: JobModel[] | null;
  updateVehicles: (updatedVehicle: VehicleModel) => void;
  updateJobs: (updatedJob: JobModel) => void;
  addNewVehicle: () => void;
}

export default function VehicleList(props: VehicleListProps) {
  const { vehicles, allJobs, updateVehicles, updateJobs, addNewVehicle } = props;

  return (
    <div>
      {vehicles && vehicles.length > 0 ? vehicles.map(vehicle => {
        return (
          <VehicleDisplay
            allJobs={allJobs}
            key={vehicle._id}
            updateVehicle={updateVehicles}
            updateJobs={updateJobs}
            vehicleProp={vehicle}
          />
        )
      }) : (
        <p>No Vehciles.</p>
      )}
      <AddVehicleButton handleClick={addNewVehicle} />
    </div>
  );
}
