import React, { Component, ChangeEvent } from 'react';
import '../../styles/JobDisplay.css';
import JobModel from '../../Models/JobModel';

export interface Props {
  index: number
  vehicleIndex: number;
  job: JobModel;
  updateJob: (e: ChangeEvent<HTMLInputElement>, job: JobModel) => void;
  handleSelection: (jobIndex: number) => void;
  style: string;
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
  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.updateJob(e, this.props.job);
  }

  render() {
    const { job, index, style, handleSelection } = this.props;
    return (
      <li key={job._id} className={style} onSelect={() => {handleSelection(index)}}>
          <input id="job" type="text" onChange={this.handleChange} value={job.job} />
          <input id="time" type="number" onChange={this.handleChange} value={job.time} />
      </li>
    );
  }
}
export default JobDisplay;