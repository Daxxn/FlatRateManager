import React, { useState } from 'react';
import VehicleModel from '../../Models/VehicleModel';
import JobList from '../JobComponents/JobList';
import VehicleInput from '../BaseComponents/VehicleInput';
import JobModel from '../../Models/JobModel';

export interface VehicleDisplayProps {
  vehicleProp: VehicleModel;
  updateVehicle: (updatedVehicle: VehicleModel) => void;
  updateJobs: (updatedJob: JobModel) => void;
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
  const { vehicleProp, updateVehicle, updateJobs } = props;
  const [vehicle, setVehicle] = useState(vehicleProp);
  const [make, setMake] = useState(vehicleProp.make);
  const [model, setModel] = useState(vehicleProp.model);
  const [year, setYear] = useState(vehicleProp.year);

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

  /**
   * Remove later if needed.
   * @param updatedJob 
   */
  const handleUpdateJob = (updatedJob: JobModel) => {
    updateJobs(updatedJob);
  }

  const styles = makeStyle();
  return (
    <div key={vehicle._id} onBlur={() => updateVehicle(vehicle)} style={styles.container}>
      <VehicleInput id="make" vehicleId={vehicle._id} value={make} onChange={handleInputChange} />
      <VehicleInput id="model" vehicleId={vehicle._id} value={model} onChange={handleInputChange} />
      <VehicleInput id="year" vehicleId={vehicle._id} value={year} onChange={handleInputChange} />
      <JobList allJobs={vehicle.jobs} updateJobs={handleUpdateJob}/>
    </div>
  )
}
