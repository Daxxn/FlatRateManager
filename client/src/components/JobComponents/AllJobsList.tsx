import React from 'react';
import JobModel from '../../Models/JobModel';
import BasicJobList from './BasicJobList';
import '../../styles/AllJobsList.css';

export interface AllJobListProps {
  allJobs: JobModel[] | null;
  updateJobs: (updatedJob: JobModel) => void;
  newJob: () => void;
}

export default function AllJobList(props: AllJobListProps) {
  const { allJobs, updateJobs, newJob } = props;

  return (
    <div className="alljoblist">
      <h4 className="jobListTitle">Job List</h4>
      <BasicJobList currentJobs={allJobs} updateJobs={updateJobs} />
      <button onClick={newJob}>Add Job</button>
    </div>
  )
}