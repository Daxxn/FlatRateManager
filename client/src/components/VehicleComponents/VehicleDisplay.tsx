import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import '../../styles/VehicleDisplay.css';
import VehicleModel from '../../Models/VehicleModel';
import JobList from '../JobComponents/JobList';

export interface Props {
  vehicle: VehicleModel,
  updateVehicle: Function,
  updateJob: Function,
  handleSelection: Function,
};

export default class VehicleDisplay extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
  }
  /**
   * 
   * @param {Event} e event agrs
   */
  handleVehicleChange(e: any) {
    const {id, value} = e.target;
    //console.log(value);
    this.props.updateVehicle(this.props.vehicle._id, id, value);
  }

  handleJobChange(e: any) {
    const {id, value} = e.target;
    this.props.updateJob(this.props.vehicle._id, id, value)
  }

  render() {
    const { _id, make, model, year, jobs } = this.props.vehicle;
    return (
      <li id={_id} key={_id} onSelect={() => {this.props.handleSelection(_id)}} >
        <input id="make" type="text" onChange={this.handleVehicleChange} value={make} />
        <input id="model" type="text" onChange={this.handleVehicleChange} value={model} />
        <input id="year" type="number" onChange={this.handleVehicleChange} value={year} />
        <ul>
          <JobList allJobs={jobs} updateJob={this.handleJobChange} />
        </ul>
      </li>
    );
  }
}
