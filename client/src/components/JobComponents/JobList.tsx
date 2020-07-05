import React from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';

const makeStyles = () => {
  return {
    container: {
      display: 'grid',
      gridColum: '1 / 4',
      gridRow: '2 / 2',
      // gridTemplateColumns: 'repeat(2, 1fr)',
    },
  };
}

export interface JobListProps {
  allJobs: JobModel[] | null,
  updateJobs: (updatedJob: JobModel) => void;
};


export default function JobList(props: JobListProps) {
  const { allJobs, updateJobs } = props;

  const styles = makeStyles();
  return (
    <div style={styles.container}>
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
