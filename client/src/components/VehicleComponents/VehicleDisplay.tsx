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
  const [make, setMake] = useState(vehicleProp.make);
  const [model, setModel] = useState(vehicleProp.model);
  const [year, setYear] = useState(vehicleProp.year);

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
  }

  const handleSelectedJobChange = (currentJobs: string[]) => {
    const newVehicle = vehicleProp;
    const newJobs = allJobs?.filter(job => currentJobs.includes(job._id));
    if (newJobs) {
      newVehicle.jobs = newJobs;
    } else {
      newVehicle.jobs = [];
    }
    updateVehicle(newVehicle);
  };

  /**
   * Remove later if needed.
   * @param updatedJob 
   */
  const handleUpdateJob = (updatedJob: JobModel) => {
    updateJobs(updatedJob);
  }

  const handleFocusChange = () => {
    const newVehicle = vehicleProp;
    newVehicle.make = make;
    newVehicle.model = model;
    newVehicle.year = year;
    updateVehicle(newVehicle);
  };

  return (
    <div
      key={vehicleProp._id}
      onBlur={handleFocusChange}
      className="vehiclecontainer"
    >
      <VehicleInput
        css="vehicleinput make"
        id="make"
        vehicleId={vehicleProp._id}
        value={make}
        onChange={handleInputChange}
      />
      <VehicleInput
        css="vehicleinput model"
        id="model"
        vehicleId={vehicleProp._id}
        value={model}
        onChange={handleInputChange}
      />
      <VehicleInput
        css="vehicleinput year"
        id="year"
        vehicleId={vehicleProp._id}
        value={year}
        onChange={handleInputChange}
      />
      <JobList
        currentJobs={vehicleProp.jobs}
        allJobs={allJobs}
        updateJobs={handleUpdateJob}
        handleSelectedJobChange={handleSelectedJobChange}
      />
    </div>
  )
}
