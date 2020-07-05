import React from 'react';

export interface AddVehicleButtonProps {
  handleClick: () => void;
}

export default function AddVehicleButton(props: AddVehicleButtonProps) {
  const { handleClick } = props;

  return (
    <button type="button" id="add-vehicle-button" onClick={handleClick}>Add Vehicle</button>
  )
}