import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import JobModel from '../Models/JobModel';

export interface JobLinkProps {
  job: JobModel,
};

class JobLink extends Component<JobLinkProps, {}> {
  render() {
    const { _id, job, time } = this.props.job;
    return (
      <li id={_id}>
        <p>{job}</p>
        <p>{time}</p>
      </li>
    );
  }
}

export default JobLink;
