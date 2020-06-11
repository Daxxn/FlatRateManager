import React, { Component, MouseEvent, ChangeEvent } from 'react';
// import PropTypes from 'prop-types';
import '../../styles/VehicleDisplay.css';
import VehicleModel from '../../Models/VehicleModel';
import JobList from '../JobComponents/JobList';
import AddJobControl from '../AddJobControl';
import JobModel from '../../Models/JobModel';

export interface Props {
  index: number;
  selJobIndex: number;
  vehicle: VehicleModel;
  updateVehicle: Function;
  updateJob: (e: ChangeEvent<HTMLInputElement>, vehicle: VehicleModel, job: JobModel) => void;
  newJob: (vehicle: VehicleModel) => void;
  handleVehicleSelect: (vehI: number) => void;
  handleJobSelect: (jobI: number) => void;
  style: string;
};

export default class VehicleDisplay extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
    this.handleNewJob = this.handleNewJob.bind(this);
  }
  /**
   * 
   * @param {ChangeEvent<HTMLInputElement>} e event agrs
   */
  handleVehicleChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.updateVehicle(e, this.props.vehicle._id);
  }

  handleJobChange(e: ChangeEvent<HTMLInputElement>, job: JobModel): void {
    this.props.updateJob(e, this.props.vehicle, job);
  }

  handleNewJob(e: MouseEvent) {
    this.props.newJob(this.props.vehicle);
  }

  render() {
    const {
      index,
      vehicle,
      selJobIndex,
      style,
      handleVehicleSelect,
      handleJobSelect,
    } = this.props;
    const { _id, make, model, year, jobs } = vehicle;

    return (
      <li className={style} id={_id} key={_id} onSelect={() => {handleVehicleSelect(index)}} >
        <input id="make" type="text" onChange={this.handleVehicleChange} value={make} />
        <input id="model" type="text" onChange={this.handleVehicleChange} value={model} />
        <input id="year" type="number" onChange={this.handleVehicleChange} value={year} />
        <ul>
          <JobList
            selectIndex={selJobIndex}
            vehicleIndex={index}
            allJobs={jobs}
            updateJob={this.handleJobChange}
            newJob={this.handleNewJob}
            handleSelection={handleJobSelect}
          />
          <AddJobControl />
        </ul>
      </li>
    );
  }
}
