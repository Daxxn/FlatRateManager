import React, { Component } from 'react';
import '../styles/JobDisplay.css';
import PropTypes from 'prop-types';

class JobDisplay extends Component {
  render() {
    const jobData = this.props.allJobs !== undefined ? this.props.allJobs.map((job) => {
      return (
        <ol key={job._id} className="joblist">
          <li><b>Job</b>: {job.job}</li>
          <li><b>Time</b>: {job.time}</li>
        </ol>
        )
      }) : (<ul></ul>)
    return (
      <div>
        <ol className="jobframe">
          {jobData}
        </ol>
      </div>
    );
  }
}
JobDisplay.propTypes = {
  allJobs: PropTypes.arrayOf(PropTypes.object),
};
export default JobDisplay;