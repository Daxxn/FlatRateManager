import React, { useState } from 'react';
import VehicleModel from '../../Models/VehicleModel';
import JobList from '../JobComponents/JobList';
import Input from '../BaseComponents/input';

export interface VehicleDisplayProps {
  vehicleProp: VehicleModel;
  updateVehicle: (updatedVehicle: VehicleModel) => void;
}

const makeStyle = () => {
  return {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      backgroundColor: '#ffffff',
      padding: '2px',
      alignItems: 'flex-start',
    },
  };
};

export default function VehicleDisplay(props: VehicleDisplayProps) {
  const { vehicleProp, updateVehicle } = props;
  const [vehicle, setVehicle] = useState(vehicleProp);
  const [make, setMake] = useState(vehicleProp.make);
  const [model, setModel] = useState(vehicleProp.model);
  const [year, setYear] = useState(vehicleProp.year);
  const [jobs, setJobs] = useState(vehicleProp.jobs);
  // const { make, model, year, jobs } = vehicle;

  // const handleInputChange = (id: 'make' | 'model' | 'year', value: string | number) => {
  //   const tempInput = {
  //     [id]: value,
  //   };
  //   console.log(tempInput);
  //   const newVehicle = Object.assign(vehicleProp, tempInput);
  //   console.log(newVehicle);
  //   setVehicle(newVehicle);
  //   // updateVehicle(newVehicle);
  // };

  const updateState = () => {
    const newVehicle = vehicle;
    newVehicle.make = make;
    newVehicle.model = model;
    newVehicle.year = year;
    setVehicle(newVehicle);
  }

  const handleInputChange = (id: 'make' | 'model' | 'year', value: string | number) => {
    switch (id) {
      case 'make':
        setMake(value as string);
        break;
      case 'model':
        setModel(value as string);
        break;
      case 'year':
        setYear(value as number);
        break;
      default:
        throw new Error('Unknown ID!!');
    }
    updateState();
  }

  const styles = makeStyle();
  return (
    <li key={vehicle._id} onBlur={() => updateVehicle(vehicle)} style={styles.container}>
      <Input id="make" vehicleId={vehicle._id} value={make} onChange={handleInputChange} />
      <Input id="model" vehicleId={vehicle._id} value={model} onChange={handleInputChange} />
      <Input id="year" vehicleId={vehicle._id} value={year} onChange={handleInputChange} />
      <JobList allJobs={jobs} />
    </li>
  )
}
