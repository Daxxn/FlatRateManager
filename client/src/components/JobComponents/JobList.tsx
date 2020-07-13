import React from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';
import '../../styles/JobDisplay.css';

export interface JobListProps {
  allJobs: JobModel[] | null,
  updateJobs: (updatedJob: JobModel) => void;
};


export default function JobList(props: JobListProps) {
  const { allJobs, updateJobs } = props;

  return (
    <div className="joblist">
      {allJobs && allJobs.length > 0 ? allJobs.map(job => {
        return (
          <JobDisplay jobProp={job} updateJob={updateJobs} />
        )
      }) : (
        <p>No Jobs.</p>
      )}
    </div>
  );
}
