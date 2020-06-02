import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import '../styles/VehicleDisplay.css';
import VehicleModel from '../Models/VehicleModel';
// import JobDisplay from './JobDisplay';

export interface Props {
  id: string,
  vehicle: VehicleModel,
  updateVehicle: Function,
  handleSelection: Function,
};

export default class VehicleDisplay extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * 
   * @param {Event} e event agrs
   */
  handleChange(e: any) {
    const {id, value} = e.target;
    console.log(value);
    this.props.updateVehicle(this.props.id, id, value);
  }

  render() {
    const { _id, make, model, year, /*jobs*/ } = this.props.vehicle;
    return (
      <li id={_id} key={_id} onSelect={() => {this.props.handleSelection(_id)}} >
        <input id="make" type="text" onChange={this.handleChange} value={make} />
        <input id="model" type="text" onChange={this.handleChange} value={model} />
        <input id="year" type="number" onChange={this.handleChange} value={year} />
        <ul>
          {/* <JobDisplay allJobs={jobs} /> */}
        </ul>
      </li>
    );
  }
}
