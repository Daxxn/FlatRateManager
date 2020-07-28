import React from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';
import '../../styles/JobDisplay.css';
import JobSelector from './JobSelector';

export interface JobListProps {
  isJobDisplay: boolean;
  currentJobs: JobModel[] | null;
  allJobs: JobModel[] | null;
  updateJobs: (updatedJob: JobModel) => void;
};


export default function JobList(props: JobListProps) {
  const { isJobDisplay, currentJobs, allJobs, updateJobs } = props;

  return (
    <div className="jobContainer">
      <div className="jobLists">
        {currentJobs && currentJobs.length > 0 ? currentJobs.map(job => {
          return (
            <JobDisplay jobProp={job} updateJob={updateJobs} />
          )
        }) : (
          <p className="noJob">No Jobs.</p>
        )}
      </div>
      {!isJobDisplay ? (
        <JobSelector allJobs={allJobs} />
      ) : (
        ''
      )}
    </div>
  );
}
