import React, { Component } from 'react';
import PropTypes from 'prop-types';

class JobLink extends Component {
  render() {
    const { id, job, time } = this.props.job;
    return (
      <li id={id}>
        <p>{job}</p>
        <p>{time}</p>
      </li>
    );
  }
}
JobLink.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobLink;
