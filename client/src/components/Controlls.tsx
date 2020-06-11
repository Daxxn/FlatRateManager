import React from 'react';
import PropTypes from 'prop-types';

export interface ControllsProps {
  onGetVehiclesClick: any,
  onGetJobsClick: any,
  getOneVehicle: any,
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
      </div>
    </div>
  );
}
Controlls.propTypes = {
  onGetVehiclesClick: PropTypes.func.isRequired,
  onGetJobsClick: PropTypes.func.isRequired,
  getOneVehicle: PropTypes.func.isRequired,
};

export default Controlls;