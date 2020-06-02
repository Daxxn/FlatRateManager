import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/VehicleDisplay.css';
// import JobDisplay from './JobDisplay';

class VehicleDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * 
   * @param {Event} e event agrs
   */
  handleChange(e) {
    const {id, value} = e.target;
    console.log(value);
    this.props.updateVehicle(this.props.id, id, value);
  }

  render() {
    const { _id, make, model, year, /*jobs*/ } = this.props.vehicle;
    return (
       <li id={_id} key={_id}>
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
VehicleDisplay.propTypes = {
  vehicle: PropTypes.object.isRequired,
  updateVehicle: PropTypes.func.isRequired,
};
export default VehicleDisplay;