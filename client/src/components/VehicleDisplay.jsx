import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/VehicleDisplay.css';

class VehicleDisplay extends Component {
  buildJobString(job) {
    return (
      <ul>
        <li><b>Job</b>: {job.job}</li>
        <li><b>Time</b>: {job.time}</li>
      </ul>
    )
  }

  buildDisplayString(vehicle) {
    return (
      <ul className="liststyle" key={vehicle._id} id={vehicle._id}>
        <li><b>Make</b>: {vehicle.make}</li>
        <li><b>Model</b>: {vehicle.model}</li>
        <li><b>Year</b>: {vehicle.year}</li>
        <ul>
          {vehicle.jobs.map((job) => {return this.buildJobString(job)})}
        </ul>
      </ul>
    );
  }

  getCSSClasses(index) {
    if(index === this.props.selectedIndex) {
      return "item selected";
    } else {
      return "item";
    }
  }

  render() {
    const vehicles = (this.props.allVehicles !== undefined) ? this.props.allVehicles.map((vehicle, i) => {
      return <li className={this.getCSSClasses(i)} key={vehicle._id} id={vehicle._id} onClick={this.props.selectTest}>{this.buildDisplayString(vehicle)}</li>
    }) : <li></li>;
    return (
      <div>
        <ol>
          {vehicles}
        </ol>
      </div>
    );
  }
}
VehicleDisplay.propTypes = {
  allVehicles: PropTypes.arrayOf(PropTypes.object),
  selectTest: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};
export default VehicleDisplay;