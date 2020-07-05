import React from 'react';
import VehicleModel from '../../Models/VehicleModel';
import VehicleDisplay from './VehicleDisplay';

export interface VehicleListProps {
  vehicles: VehicleModel[] | null;
  updateVehicles: (updatedVehicle: VehicleModel) => void;
}

export default function VehicleList(props: VehicleListProps) {
  const { vehicles, updateVehicles } = props;

  return (
    <div>
      {vehicles && vehicles.length > 0 ? vehicles.map(vehicle => {
        return (
          <VehicleDisplay key={vehicle._id} updateVehicle={updateVehicles} vehicleProp={vehicle} />
        )
      }) : (
        <p>No Vehciles.</p>
      )}
    </div>
  );
}
