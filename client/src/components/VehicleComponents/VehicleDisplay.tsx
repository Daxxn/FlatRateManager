import React, { useState } from 'react';
import VehicleModel from '../../Models/VehicleModel';
import JobList from '../JobComponents/JobList';
import VehicleInput from '../BaseComponents/VehicleInput';
import JobModel from '../../Models/JobModel';
import '../../styles/VehicleDisplay.css';

export interface VehicleDisplayProps {
  vehicleProp: VehicleModel;
  allJobs: JobModel[] | null;
  updateVehicle: (updatedVehicle: VehicleModel) => void;
  updateJobs: (updatedJob: JobModel) => void;
}

export default function VehicleDisplay(props: VehicleDisplayProps) {
  const { vehicleProp, allJobs, updateVehicle, updateJobs } = props;
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

  return (
    <div
      key={vehicle._id}
      onBlur={() => updateVehicle(vehicle)}
      className="vehiclecontainer"
    >
      <VehicleInput
        css="vehicleinput make"
        id="make"
        vehicleId={vehicle._id}
        value={make}
        onChange={handleInputChange}
      />
      <VehicleInput
        css="vehicleinput model"
        id="model"
        vehicleId={vehicle._id}
        value={model}
        onChange={handleInputChange}
      />
      <VehicleInput
        css="vehicleinput year"
        id="year"
        vehicleId={vehicle._id}
        value={year}
        onChange={handleInputChange}
      />
      <JobList isJobDisplay={false} currentJobs={vehicle.jobs} allJobs={allJobs} updateJobs={handleUpdateJob}/>
    </div>
  )
}
