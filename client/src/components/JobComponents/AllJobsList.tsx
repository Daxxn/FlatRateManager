import React from 'react';
import { Interface } from 'readline';
import JobModel from '../../Models/JobModel';
import JobList from './JobList';

const makeStyles = () => {
  return {
    gridColumn: '2 / 2',
  };
}

export interface AllJobListProps {
  allJobs: JobModel[] | null;
  updateJobs: (updatedJob: JobModel) => void;
}

export default function AllJobList(props: AllJobListProps) {
  const { allJobs, updateJobs } = props;
  const styles = makeStyles();
  return (
    <div style={styles}>
      <h4>Job List</h4>
      <JobList allJobs={allJobs} updateJobs={updateJobs} />
    </div>
  )
}