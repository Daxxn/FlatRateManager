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
  // getVehicle,
  // postRequest,
  // patchRequest,
} from '../logic/ApiFetchMethods';
import AllJobList from './JobComponents/AllJobsList';

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
      })
      .catch(err => {
        setMessage(err.message);
        setStatusCode(err.status);
      });
  };

  const getAllJobs = async () => {
    try {
      setAllJobs(await getJobs());
    } catch (err) {
      setMessage(err.message);
    }
  };
  //#endregion

  // const getOneVehicle = async (id: string) => {
  //   try {
  //     console.log(await getVehicle(id));
  //   } catch (err) {
  //     setMessage(err.message);
  //   }
  // }

  // const patchVehicles = async (vehicles: VehicleModel[]) => {
  //   try {
  //     const newVehicles = await patchRequest<VehicleModel[]>(vehicles, 'vehicles');
  //     console.log(newVehicles);
  //   } catch (err) {
  //     setMessage(err.message);
  //   }
  // };

  // const patchVehicle = async (vehicle: VehicleModel) => {
  //   try {
  //     const updatedVehicle = await 
  //   } catch (err) {
      
  //   }
  // };

  // const postVehicle = (newVehicle: VehicleModel) => {
  //   return postRequest<VehicleModel>(newVehicle, 'vehicles')
  //     .then(vehicle => vehicle)
  //     .catch(err => setMessage(err.message));
  // };

  // const postNewJob = async (newJob: JobModel) => {
  //   try {
  //     const job = await postBlankJob();
  //     console.log(job);
  //   } catch (err) {
  //     setMessage(err.message);
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
  //#endregion

  const createNewJob = async () => {
    try {
      const newJob = await postBlankJob();
      const tempJobs = allJobs;
      tempJobs?.push(newJob);
      setAllJobs(tempJobs);
    } catch (err) {
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
      } catch (err) {
        setMessage(err.message);
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
      } catch (err) {
        setMessage(err.message);
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
