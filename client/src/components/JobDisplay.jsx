import React, { Component } from 'react';
import '../styles/JobDisplay.css';
import PropTypes from 'prop-types';
import NewJob from './newJob';

class JobDisplay extends Component {
  render() {
    const {allJobs, newClick} = this.props;
    const jobData = allJobs !== undefined ? allJobs.map((job) => {
      return (
        <ul key={job._id} className="joblist">
          <li><b>Job</b>: {job.job}</li>
          <li><b>Time</b>: {job.time}</li>
        </ul>
        )
      }) : (<ul></ul>)
    return (
      <div>
        <ol className="jobframe">
          {jobData}
          <NewJob newJobHandle={newClick}/>
        </ol>
      </div>
    );
  }
}
JobDisplay.propTypes = {
  allJobs: PropTypes.arrayOf(PropTypes.object),
  newClick: PropTypes.func.isRequired,
};
export default JobDisplay;