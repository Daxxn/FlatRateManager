import React from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';
import '../../styles/JobList.css';
import JobSelector from './JobSelector';

export interface JobListProps {
  currentJobs: JobModel[] | null;
  allJobs: JobModel[] | null;
  updateJobs: (updatedJob: JobModel) => void;
  handleSelectedJobChange: (jobIds: string[]) => void;
};


export default function JobList(props: JobListProps) {
  const { currentJobs, allJobs, updateJobs, handleSelectedJobChange } = props;

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
      <JobSelector allJobs={allJobs} currentJobs={currentJobs} handleSelectedJobChange={handleSelectedJobChange} />
    </div>
  );
}
