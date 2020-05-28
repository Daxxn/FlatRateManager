import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/NewJob.css';

class NewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: '',
      time: 0,
    };
    this.jobHandler = this.jobHandler.bind(this);
    this.timeHandler = this.timeHandler.bind(this);
    this.newJobHandler = this.newJobHandler.bind(this);
    this.clearJob = this.clearJob.bind(this);
  }

  //#region Event Handlers
  jobHandler(e) {
    this.setState({ job: e.target.value });
  }

  timeHandler(e) {
    this.setState({ time: e.target.value });
  }

  newJobHandler() {
    const {job, time} = this.state;
    return {
      job: job,
      time: time,
    };
  }

  clearJob() {
    this.setState({
      job: '',
      time: 0,
    })
  }
  //#endregion

  render() {
    const { job, time } = this.state;
    return (
      <ul className="newjobframe">
        <p className="title">New Job:</p>
        <p className="joblabel">Job:</p>
        <input className="jobinput" type="text" onChange={this.jobHandler} value={job} />
        <p className="timelabel">Time:</p>
        <input className="timeinput" type="number" onChange={this.timeHandler} value={time} />
        <button className="button" type="button" onClick={() => {this.props.newJobHandle(this.newJobHandler, this.clearJob)}}>New Job</button>
      </ul>
    );
  }
}
NewJob.propTypes = {
  newJobHandle: PropTypes.func.isRequired,
};
 
export default NewJob;