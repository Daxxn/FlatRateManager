import React, { Component, MouseEvent, ChangeEvent } from 'react';
// import PropTypes from 'prop-types';
import '../../styles/VehicleDisplay.css';
import VehicleModel from '../../Models/VehicleModel';
import JobList from '../JobComponents/JobList';
import AddJobControl from '../AddJobControl';
import { UpdateJobsFunction } from '../MainPage';
import JobModel from '../../Models/JobModel';

export interface Props {
  vehicle: VehicleModel,
  updateVehicle: Function,
  updateJob: UpdateJobsFunction;
  newJob: (vehicle: VehicleModel) => void;
  handleSelection: Function,
};

export default class VehicleDisplay extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleNewJob = this.handleNewJob.bind(this);
  }
  /**
   * 
   * @param {ChangeEvent<HTMLInputElement>} e event agrs
   */
  handleVehicleChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.updateVehicle(e, this.props.vehicle._id);
  }

  handleJobChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.updateJob(e, this.props.vehicle, new JobModel('', '', 0));
  }

  handleNewJob(e: MouseEvent) {
    this.props.newJob(this.props.vehicle);
  }

  render() {
    const { _id, make, model, year, jobs } = this.props.vehicle;
    return (
      <li id={_id} key={_id} onSelect={() => {this.props.handleSelection(_id)}} >
        <input id="make" type="text" onChange={this.handleVehicleChange} value={make} />
        <input id="model" type="text" onChange={this.handleVehicleChange} value={model} />
        <input id="year" type="number" onChange={this.handleVehicleChange} value={year} />
        <ul>
          <JobList allJobs={jobs} updateJob={this.handleJobChange} newJob={this.handleNewJob}/>
          <AddJobControl />
        </ul>
      </li>
    );
  }
}
