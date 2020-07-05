import React, { useState } from 'react';
import '../../styles/JobDisplay.css';
import JobModel from '../../Models/JobModel';
import VehicleInput from '../BaseComponents/VehicleInput';
import JobInput from '../BaseComponents/JobInput';

export interface JobDisplayProps {
  jobProp: JobModel,
  updateJob: (updatedJob: JobModel) => void,
}

export default function JobDisplay(props: JobDisplayProps) {
  const { jobProp, updateJob } = props;
  const [job, setJob] = useState(jobProp);
  const [name, setName] = useState(jobProp.job);
  const [time, setTime] = useState(jobProp.time);

  const updateState = () => {
    const newJob = job;
    newJob.job = name;
    newJob.time = time;
    setJob(newJob);
  }

  const handleInputChange = (id: 'job' | 'time', value: string | number) => {
    switch (id) {
      case 'job':
        setName(value as string);
        break;
      case 'time':
        setTime(value as number);
        break;
      default:
        throw new Error('Unknown ID!!');
    }
    updateState();
  }

  return (
    <li onBlur={() => updateJob(job)}>
      <JobInput id="job" jobId={job._id} value={name} handleChange={handleInputChange} />
      <JobInput id="time" jobId={job._id} value={time} handleChange={handleInputChange} />
    </li>
  );
}
