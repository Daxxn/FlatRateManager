import React, { Component, MouseEvent } from 'react';
import JobModel from '../../Models/JobModel';
import JobDisplay from './JobDisplay';

export interface Props {
  allJobs: JobModel[],
  updateJob: Function,
  newJob: (e: MouseEvent) => void,
  //handleSelection: Function,
};

export default class JobList extends Component<Props, {}> {
  render() {
    const jobs = this.props.allJobs !== (undefined || null) ? this.props.allJobs.map((job) => {
      return <JobDisplay job={job} updateJob={this.props.updateJob} />
    }) : <li></li>
    return (
      <ol>
        {jobs}
        <button type="button" onClick={this.props.newJob}>New Job</button>
      </ol>
    )
  }
}
