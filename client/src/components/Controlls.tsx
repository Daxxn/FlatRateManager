import React from 'react';
import PropTypes from 'prop-types';

export interface ControllsProps {
  onGetVehiclesClick: any,
  onGetJobsClick: any,
  getOneVehicle: any,
  selectedVehicleID: string,
};

const Controlls: React.FC<ControllsProps> = (props: ControllsProps) => {
  return (
    <div className="controllscontainer">
      <div className="getbuttonsitem">
            <button
              type="button"
              onClick={props.onGetVehiclesClick}>
                GET Vehicles
            </button>
            <button
              type="button"
              onClick={props.onGetJobsClick}>
                GET Jobs
            </button>
            <button
              type="button"
              onClick={() => {props.getOneVehicle(props.selectedVehicleID)}}>
                GET Selected vehicle
            </button>
      </div>
    </div>
  );
}
Controlls.propTypes = {
  onGetVehiclesClick: PropTypes.func.isRequired,
  onGetJobsClick: PropTypes.func.isRequired,
  getOneVehicle: PropTypes.func.isRequired,
  selectedVehicleID: PropTypes.string.isRequired,
};

export default Controlls;