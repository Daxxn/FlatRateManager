import React, { Component, MouseEvent, ChangeEvent } from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';

export interface Props {
  vehicleIndex: number;
  selectIndex: number;
  allJobs: JobModel[];
  updateJob: (e: ChangeEvent<HTMLInputElement>, job: JobModel) => void;
  newJob: (e: MouseEvent) => void;
  handleSelection: (jobI: number) => void;
};

export default class JobList extends Component<Props, {}> {
  render() {
    const { vehicleIndex, selectIndex, allJobs, updateJob, newJob, handleSelection} = this.props;
    const jobs = allJobs !== (undefined || null) ? allJobs.map((job, ind) => {
      return <JobDisplay style={selectIndex === ind ? 'jobSelect' : 'joblist'} index={ind} vehicleIndex={vehicleIndex} job={job} updateJob={updateJob} handleSelection={handleSelection} />
    }) : <li></li>
    return (
      <ol>
        {jobs}
        <button type="button" onClick={newJob}>New Job</button>
      </ol>
    )
  }
}
