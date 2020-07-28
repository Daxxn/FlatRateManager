import React from 'react';
import JobModel from '../../Models/JobModel';
import JobList from './JobList';
import '../../styles/AllJobsList.css'

export interface AllJobListProps {
  allJobs: JobModel[] | null;
  updateJobs: (updatedJob: JobModel) => void;
}

export default function AllJobList(props: AllJobListProps) {
  const { allJobs, updateJobs } = props;

  return (
    <div className="alljoblist">
      <h4>Job List</h4>
      <JobList isJobDisplay currentJobs={allJobs} allJobs={null} updateJobs={updateJobs} />
    </div>
  )
}