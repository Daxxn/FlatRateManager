import React from 'react';
import VehicleModel from '../../Models/VehicleModel';
import VehicleDisplay from './VehicleDisplay';

export interface VehicleListProps {
  allVehicles: VehicleModel[] | null;
}

export default function VehicleList(props: VehicleListProps) {
  const { allVehicles } = props;
  return (
    <div>
      {allVehicles && allVehicles.length > 0 ? allVehicles.map(vehicle => {
        return (
          <VehicleDisplay vehicle={vehicle} />
        )
      }) : (
        <p>No Vehciles.</p>
      )}
    </div>
  );
}
