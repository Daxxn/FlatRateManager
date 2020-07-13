import React from 'react';
import '../../styles/VehicleInput.css';

export interface VehicleInputProps {
  id: 'make' | 'model' | 'year';
  vehicleId: string;
  value: string | number;
  css: string; 
  onChange: (id: 'make' | 'model' | 'year', value: string | number) => void;
}

export default function VehicleInput(props: VehicleInputProps) {
  const { id, vehicleId, value, onChange, css } = props;

  return (
    <div className={css}>
      <p className="inputtitle">{`${id}`}</p>
      <input
        key={`${vehicleId}-${id}`}
        id={`${vehicleId}-${id}`}
        type={id === 'year' ? 'number' : 'text'}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  )
}