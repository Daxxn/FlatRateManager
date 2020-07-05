import React from 'react';
import VehicleModel from '../../Models/VehicleModel';
import VehicleDisplay from './VehicleDisplay';
import JobModel from '../../Models/JobModel';

export interface VehicleListProps {
  vehicles: VehicleModel[] | null;
  updateVehicles: (updatedVehicle: VehicleModel) => void;
  updateJobs: (updatedJob: JobModel) => void;
}

export default function VehicleList(props: VehicleListProps) {
  const { vehicles, updateVehicles, updateJobs } = props;

  return (
    <div>
      {vehicles && vehicles.length > 0 ? vehicles.map(vehicle => {
        return (
          <VehicleDisplay key={vehicle._id} updateVehicle={updateVehicles} updateJobs={updateJobs} vehicleProp={vehicle} />
        )
      }) : (
        <p>No Vehciles.</p>
      )}
    </div>
  );
}
