import React from 'react';

const makeStyles = (id: string) => {
  let location = '';
  if (id === 'make') {
    location = '1';
  } else if (id === 'model') {
    location = '2';
  } else {
    location = '3';
  }
  return {
    gridColum: location,
    gridRow: '1',
    backgroundColor: '#b5dcff',
  };
}

export interface VehicleInputProps {
  id: 'make' | 'model' | 'year';
  vehicleId: string;
  value: string | number;
  onChange: (id: 'make' | 'model' | 'year', value: string | number) => void;
}

export default function VehicleInput(props: VehicleInputProps) {
  const { id, vehicleId, value, onChange } = props;
  const styles = makeStyles(id)
  return (
    <div>
      <p>{`${id}:`}</p>
      <input
        key={`${vehicleId}-${id}`}
        style={styles}
        id={`${vehicleId}-${id}`}
        type={id === 'year' ? 'number' : 'text'}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  )
}