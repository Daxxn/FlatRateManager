import React, { SyntheticEvent } from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';

export interface JobListProps {
  allJobs: JobModel[],
  // updateJob: Function,
  // newJob: (e: MouseEvent) => void,
  //handleSelection: Function,
};


export default function JobList(props: JobListProps) {
  const { allJobs } = props;

  const newJob = (e: SyntheticEvent<HTMLElement>) => {
    console.log(e.currentTarget);
  };

  return (
    <div onSelect={newJob}>
      {allJobs && allJobs.length > 0 ? allJobs.map(job => {
        return (
          <JobDisplay job={job} />
        )
      }) : (
        <p>No Jobs.</p>
      )}
    </div>
  );
}
