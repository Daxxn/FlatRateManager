import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import VehicleList from './VehicleComponents/VehicleList';
import VehicleModel from '../Models/VehicleModel';
import JobModel from '../Models/JobModel';
import MenuBar from './MenuBar';
import {
  getVehicles,
  getJobs,
  postBlankVehicle,
  postBlankJob,
  patchVehicle,
  patchJob,
} from '../logic/ApiFetchMethods';
import AllJobList from './JobComponents/AllJobsList';
import StatusCode from './StatusCode';

const MainPage = () => {
  const [allVehicles, setAllVehicles] = useState<VehicleModel[] | null>(null);
  const [allJobs, setAllJobs] = useState<JobModel[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  // Need to implement status code still.
  const [statusCode, setStatusCode] = useState<number>(0);

  //#region Initial Page Load
  useEffect(() => {
    getAllVehicles();
    getAllJobs();
  }, [])

  const getAllVehicles = () => {
    getVehicles()
      .then(allVehicles => {
        setAllVehicles(allVehicles);
        setStatusCode(200);
      })
      .catch(err => {
        setMessage(err.message);
        setStatusCode(err.status);
      });
  };

  const getAllJobs = async () => {
    try {
      setAllJobs(await getJobs());
      setStatusCode(200);
    } catch (err) {
      setStatusCode(err.code);
      setMessage(err.message);
    }
  };
  //#endregion

  const createNewVehicle = () => {
    if (allVehicles) {
      postBlankVehicle()
      .then(vehicle => {
        if (vehicle) {
          const tempVehicles = [...allVehicles , vehicle];
          setAllVehicles(tempVehicles);
          setStatusCode(200);
        }
      })
      .catch(err => {
        setStatusCode(err.code);
        setMessage(err.message);
      });
    }
  }
  //#endregion

  const createNewJob = async () => {
    try {
      const newJob = await postBlankJob();
      const tempJobs = allJobs;
      tempJobs?.push(newJob);
      setAllJobs(tempJobs);
      setStatusCode(200);

    } catch (err) {
      setStatusCode(err.code);
      setMessage(err.message);
    }
  }
  //#endregion

  //#region Update functions
  const updateVehicle = async (updatedVehicle: VehicleModel) => {
    console.log('in Update vehicle');
    console.log(updatedVehicle);
    if (allVehicles) {
      try {
        const tempvehicles = allVehicles;
        const returnedVehicle = await patchVehicle(updatedVehicle);
        console.log(returnedVehicle);
        const index = tempvehicles?.findIndex(vehicle => vehicle._id === updatedVehicle._id);
        tempvehicles[index] = Object.assign(tempvehicles[index], returnedVehicle);
        setAllVehicles(tempvehicles);
        setStatusCode(200);
      } catch (err) {
        setMessage(err.message);
        setStatusCode(err.code);
      }
    }
  };

  const updateJob = async (updatedJob: JobModel) => {
    if (allJobs) {
      try {
        const tempJobs = allJobs;
        const returnedJob = await patchJob(updatedJob);
        const index = tempJobs?.findIndex(job => job._id === updatedJob._id);
        tempJobs[index] = Object.assign(tempJobs[index], returnedJob);
        setAllJobs(tempJobs);
        setStatusCode(200);
      } catch (err) {
        setMessage(err.message);
        setStatusCode(err.code);
      }
    }
  };
  //#endregion

  //#region JSX
  return (
    <div className="maincontainer">
      <div className="menucontainer">
        <MenuBar />
      </div>
      <div className="allvehiclelist">
        <h4>Vehicle List</h4>
        {message ? <p>{message}</p> : ''}
        <StatusCode statusCode={statusCode} message={message} />
        <VehicleList
          allJobs={allJobs}
          vehicles={allVehicles}
          updateVehicles={updateVehicle}
          updateJobs={updateJob}
          addNewVehicle={createNewVehicle}
        />
      </div>
      <AllJobList allJobs={allJobs} updateJobs={updateJob} newJob={createNewJob} />
    </div>
  );
  //#endregion
}

export default MainPage;
