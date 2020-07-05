import React from 'react';
import VehicleModel from '../../Models/VehicleModel';
import JobList from '../JobComponents/JobList';

export interface VehicleDisplayProps {
  vehicle: VehicleModel;
}

export default function VehicleDisplay(props: VehicleDisplayProps) {
  const { vehicle } = props;
  const { make, model, year, jobs } = vehicle;
  return (
    <li>
    <p>{make}</p>
      <p>{model}</p>
      <p>{year}</p>
      <JobList allJobs={jobs} />
    </li>
  )
}
