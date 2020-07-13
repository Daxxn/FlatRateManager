import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import VehicleList from './VehicleComponents/VehicleList';
import VehicleModel from '../Models/VehicleModel';
import JobModel from '../Models/JobModel';
import MenuBar from './MenuBar';
import {
  getVehicles,
  getJobs,
  getVehicle,
  postRequest,
  postBlankVehicle,
  // patchRequest,
} from '../APIControls/ApiFetchMethods';
import AllJobList from './JobComponents/AllJobsList';

const MainPage = () => {
  const [allVehicles, setAllVehicles] = useState<VehicleModel[] | null>(null);
  const [allJobs, setAllJobs] = useState<JobModel[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllVehicles();
    getAllJobs();
  }, [])

  const getAllVehicles = () => {
    getVehicles()
      .then(allVehicles => {
        setAllVehicles(allVehicles);
      })
      .catch(err => {
        setMessage(err.message);
      });
  };

  const getAllJobs = async () => {
    try {
      setAllJobs(await getJobs());
    } catch (err) {
      setMessage(err.message);
    }
  };

  const getOneVehicle = async (id: string) => {
    try {
      console.log(await getVehicle(id));
    } catch (err) {
      setMessage(err.message);
    }
  }

  // const patchVehicles = async (vehicles: VehicleModel[]) => {
  //   try {
  //     const newVehicles = await patchRequest<VehicleModel[]>(vehicles, 'vehicles');
  //     console.log(newVehicles);
  //   } catch (err) {
  //     setMessage(err.message);
  //   }
  // };

  // const postVehicle = async (newVehicle: VehicleModel) => {
  //   try {
  //     const vehicle = await postRequest<VehicleModel>(newVehicle, 'vehicles');
  //     console.log(vehicle);
  //     return await (vehicle as VehicleModel);
  //   } catch (err) {
  //     setMessage(err.message);
  //   }
  // };

  const postVehicle = (newVehicle: VehicleModel) => {
    return postRequest<VehicleModel>(newVehicle, 'vehicles')
      .then(vehicle => vehicle)
      .catch(err => setMessage(err.message));
  };

  const postJob = async (newJob: JobModel) => {
    try {
      const job = await postRequest<JobModel>(newJob, 'jobs');
      console.log(job);
    } catch (err) {
      setMessage(err.message);
    }
  }
  //#endregion

  // const createNewVehicle = () => {
  //   const newVehicle = new VehicleModel('', 'blank', 'blank', 0, []);
  //   const vehicleRes = postVehicle(newVehicle).then(vehicle => vehicle).catch(err => setMessage(err));
  //   if (vehicleRes) {
  //     const tempVehicles = allVehicles ? allVehicles : [];
  //     tempVehicles.push(vehicleRes);
  //     setAllVehicles(tempVehicles);
  //   }
  // }

  const createNewVehicle = () => {
    if (allVehicles) {
      postBlankVehicle()
        .then(vehicle => {
          if (vehicle) {
            const tempVehicles = [...allVehicles , vehicle];
            setAllVehicles(tempVehicles);
          }
        })
        .catch(err => {
          setMessage(err.message);
        });
    }
  }

  const createNewJob = (vehicle: VehicleModel) => {
    if (allVehicles) {
      const index = allVehicles?.findIndex(v => v._id === vehicle._id);
      const job = new JobModel(' ', 'new Job', 0);
      const tempVehicles = allVehicles;
      tempVehicles[index].jobs.push(job);
      setAllVehicles(tempVehicles);
    }
  }
  //#endregion

  //#region Update functions
  const updateVehicle = (updatedVehicle: VehicleModel) => {
    console.log('in Update vehicle');
    if (allVehicles) {
      const tempvehicles = allVehicles;
      const index = tempvehicles?.findIndex(vehicle => vehicle._id === updatedVehicle._id);
      tempvehicles[index] = Object.assign(tempvehicles[index], updatedVehicle);
      setAllVehicles(tempvehicles);
    }
  };

  const updateJob = (updatedJob: JobModel) => {
    if (allJobs) {
      const tempJobs = allJobs;
      const index = tempJobs?.findIndex(job => job._id === updatedJob._id);
      tempJobs[index] = Object.assign(tempJobs[index], updatedJob);
      setAllJobs(tempJobs);
    }
  };
  //#endregion
  
  //#region Helper Methods:
  /**
   * Searches 4 nodes up the DOM tree to find a valid id.
   * Only used during list click events.
   * Not verry useful and kinda wasteful use
   * onSelected event instead.
   *
   * @param {Object} target initial HTML element from event
   */
  const findObjectID = (target: any): string => {
    let parent = target;
    for(let i = 0; i < 5; i++) {
      if (parent.id !== '') {
        return parent.id;
      } else {
        parent = parent.parentElement;
      }
    }
    setMessage('Could not find an id.');
    return '';
  }

  const findObject = (id: string, array: Array<VehicleModel|JobModel>): VehicleModel|JobModel => {
    return array.find(veh => veh._id === id) as VehicleModel|JobModel;
  }
  //#endregion

  return (
    <div className="maincontainer">
      <div className="menucontainer">
        <MenuBar />
      </div>
      <div className="allvehiclelist"> 
        <h4>Data Output</h4>
        {message ? <p>{message}</p> : ''}
        <VehicleList
          vehicles={allVehicles}
          updateVehicles={updateVehicle}
          updateJobs={updateJob}
          addNewVehicle={createNewVehicle}
        />
      </div>
      <AllJobList allJobs={allJobs} updateJobs={updateJob} />
    </div>
  );
}

export default MainPage;
