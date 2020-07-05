import React, { ChangeEvent } from 'react';
import '../../styles/JobDisplay.css';
import JobModel from '../../Models/JobModel';

export interface JobDisplayProps {
  job: JobModel,
  // updateJob: (id: string) => void,
}

export default function JobDisplay(props: JobDisplayProps) {
  const { job } = props;
  /**
   * w
   * @param e Event Args
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    // updateJob(job._id, )
  }

  return (
    <li key={job._id} className="joblist">
        <input id="job" type="text" onChange={handleChange} value={job.job} />
        <input id="time" type="number" onChange={handleChange} value={job.time} />
    </li>
  );
}
