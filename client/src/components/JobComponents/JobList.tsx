import React from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';

const makeStyles = () => {
  return {
    container: {
      display: 'grid',
      gridColum: '1 / 4',
      gridRow: '2',
      // gridTemplateColumns: 'repeat(2, 1fr)',
    },
  };
}

export interface JobListProps {
  allJobs: JobModel[],
};


export default function JobList(props: JobListProps) {
  const { allJobs } = props;

  const styles = makeStyles();
  return (
    <div style={styles.container}>
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
