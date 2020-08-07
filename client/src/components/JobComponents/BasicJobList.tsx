import React from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';
import '../../styles/BasicJobList.css';

export interface BasicJobListProps {
  currentJobs: JobModel[] | null;
  updateJobs: (updatedJob: JobModel) => void;
};


export default function BasicJobList(props: BasicJobListProps) {
  const { currentJobs, updateJobs } = props;

  return (
    <div className="jobContainer">
      {currentJobs && currentJobs.length > 0 ? currentJobs.map(job => {
        return (
          <JobDisplay key={`job-display-${job._id}`} jobProp={job} updateJob={updateJobs} />
        )
      }) : (
        <p className="noJob">No Jobs.</p>
      )}
    </div>
  );
}
