import React, { Component } from 'react';
import '../../styles/JobDisplay.css';
import JobModel from '../../Models/JobModel';

export interface Props {
  job: JobModel,
  updateJob: Function,
}

class JobDisplay extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * w
   * @param e Event Args
   */
  handleChange(e: any) {
    const {id, value} = e.target;
    this.props.updateJob(this.props.job._id, )
  }

  render() {
    const { job } = this.props;
    return (
      <li key={job._id} className="joblist">
          <input id="job" type="text" onChange={this.handleChange} value={job.job} />
          <input id="time" type="number" onChange={this.handleChange} value={job.time} />
      </li>
    );
  }
}
export default JobDisplay;