import React, { Component, MouseEvent, ChangeEvent } from 'react';
//import PropTypes from 'prop-types';
// import VehicleDisplay from './VehicleDisplay';
import JobDisplay from './JobComponents/JobDisplay';
import '../styles/MainPage.css';
import VehicleList from './VehicleComponents/VehicleList';
import Controlls from './Controlls';
import VehicleModel from '../Models/VehicleModel';
import JobModel from '../Models/JobModel';
//import APIModel from '../APIControls/DataModels/APIModel';
import APIControl from '../APIControls/APIControl';

export interface Props {
  APIData: object;
  URLBuilder: APIControl;
}

export interface State {
  allVehicles: VehicleModel[];
  allJobs: JobModel[];
  message: string;
  selectedVehicleIndex: number;
  selectedJobIndex: number;
}

class MainPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
      allVehicles: [],
      allJobs: [],

      selectedVehicleIndex: 0,
      selectedJobIndex: 0,
    };

    this.onGetVehiclesClick = this.onGetVehiclesClick.bind(this);
    this.onGetJobsClick = this.onGetJobsClick.bind(this);
    this.getOneVehicle = this.getOneVehicle.bind(this);

    this.selectVehicleTest = this.selectVehicleTest.bind(this);
    this.updateVehicle = this.updateVehicle.bind(this);
    this.updateJob = this.updateJob.bind(this);
    this.createNewVehicle = this.createNewVehicle.bind(this);
    this.createNewJob = this.createNewJob.bind(this);
    this.handleSelectedVehicle = this.handleSelectedVehicle.bind(this);
    this.handleSelectedJob = this.handleSelectedJob.bind(this);
  }

  componentDidMount() {
    this.getallVehiclesDB();
    this.getallJobsDB();
  }

  //#region API Fetch Requests
  /**
   * Sends GET request to database for all VEHICLES.
   */
  getallVehiclesDB(): void {
    fetch(this.props.URLBuilder.APIData.APIBase + this.props.URLBuilder.APIData.APIVehicles, {
        method: this.props.URLBuilder.APIData.methods.get,
        headers: this.props.URLBuilder.APIData.headers,
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
            allVehicles: data,
          });
      })
      .catch((err) => {
        this.setState({
          message: err,
        });
      })
  }

  /**
   * Sends GET request to database for all JOBS.
   */
  getallJobsDB() {
    fetch(this.props.URLBuilder.buildURL('/jobs', ''), this.props.URLBuilder.buildGetMessage())
      .then((res: Response) => {
        return res.json();
      })
      .then((data: any) => {
        this.setState({
          allJobs: data,
        });
      })
      .catch((err: any) => {
        this.setState({
          message: err,
        });
      });
  }

  /**
   * OK, Learned alot from this but i dont think its gonna
   * be useful.
   * @param {string} id _id element from MongoDB Object.
   */
  getOneVehicle(id: string) {
    fetch(this.props.URLBuilder.buildURL('/vehicles', id), this.props.URLBuilder.buildGetMessage())
    .then((res) => {
      res.json()
      .then((data) => {
        // FIRST, TEST!
        console.log(data);
        const allVehicles = this.state.allVehicles;
        const index = allVehicles.findIndex(vehicle => vehicle._id === data._id);
        console.log(index);
        allVehicles[index] = data;
        this.setState({
          allVehicles: allVehicles,
        });
      })
      .catch((err) => {
        this.setState({
          message: err,
        });
      })
    })
    .catch((err) => {
      this.setState({
        message: err,
      });
    });
  }

  patchVehicles(vehicles: VehicleModel[]) {
    fetch(this.props.URLBuilder.buildPlainURL('/vehicles/many'), this.props.URLBuilder.buildPatchMessage(vehicles))
      .then(res => res.json())
      .then((data) => {
        this.setState({
          message: data.message
        });
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: err.data
        });
      });
  }

  postNewVehicle(vehicle: VehicleModel): void {
    fetch(this.props.URLBuilder.buildPlainURL('/vehicles/'), this.props.URLBuilder.buildPostMessage(vehicle))
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          message: data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: err.data
        });
      });
  }
  //#endregion

  onGetVehiclesClick() {
    this.getallVehiclesDB();
  }

  onGetJobsClick() {
    this.getallJobsDB();
  }

  handleSelectedVehicle(vehI: number): void {
    console.log('vehicle');
    this.setState({
      selectedVehicleIndex: vehI,
    });
  }

  handleSelectedJob(jobI: number): void {
    console.log('job');
    this.setState({
      selectedJobIndex: jobI,
    });
  }

  /**
   * Vehicle element selected event test.
   * @param {Event} e event args
   */
  selectVehicleTest(e: any) {
    const id = this.findObjectID(e.target);
    const index = this.state.allVehicles.findIndex(vehicle => vehicle._id === id);
    this.setState({
      selectedVehicleIndex: index,
    });
  }

  //#region Vehicle Controls
  updateVehicle(e: ChangeEvent<HTMLInputElement>, vehicleId: string) {
    const newVehicle = this.findObject(vehicleId, this.state.allVehicles);
    const index = this.state.allVehicles.findIndex(vehicle => vehicle._id === vehicleId);
    // @ts-ignore: Key can be accessed with string. TS doesnt like it.
    newVehicle[e.target.id] = e.target.value;
    // @ts-ignore: Key can be accessed with string. TS doesnt like it.
    this.setState(prevState => {
      prevState.allVehicles[index] = newVehicle as VehicleModel;
      return { allVehicles: prevState.allVehicles };
    });
  }

  /**
   * Updates job data in a specific vehicle.
   * @param e Input Event Args
   * @param vehicle Vehicle from input event
   * @param job Job from input event
   */
  updateJob(e: ChangeEvent<HTMLInputElement>, vehicle: VehicleModel, job: JobModel) {
    const tempVehicles = this.state.allVehicles;
    const foundVehicle = this.findObject(vehicle._id, this.state.allVehicles) as VehicleModel;
    const vehicleIndex = this.state.allVehicles.findIndex(v => v._id === vehicle._id);

    const foundJob = this.findObject(job._id, foundVehicle.jobs) as JobModel;
    const jobIndex = foundVehicle.jobs.findIndex(j => j._id === job._id);

    // @ts-ignore: Key can be accessed with string. TS doesnt like it.
    foundJob[e.target.id] = e.target.value;
    // @ts-ignore: Key can be accessed with string. TS doesnt like it.

    foundVehicle.jobs[jobIndex] = foundJob;
    tempVehicles[vehicleIndex] = foundVehicle;

    this.setState({
      allVehicles: tempVehicles,
    });
  }

  createNewVehicle() {
    const newVehicle = new VehicleModel('', 'blank', 'blank', 0, []);
    const tempVehicles = this.state.allVehicles;
    tempVehicles.push(newVehicle);
    this.setState({
      allVehicles: tempVehicles,
    });
    this.postNewVehicle(newVehicle);
  }

  createNewJob(vehicle: VehicleModel) {
    const index = this.state.allVehicles.findIndex(v => v._id === vehicle._id);
    const job = new JobModel(' ', 'new Job', 0);
    const tempVehicles = this.state.allVehicles;
    tempVehicles[index].jobs.push(job);
    this.setState({
      allVehicles: tempVehicles,
    });
  }
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
  findObjectID(target: any): string {
    let parent = target;
    for(let i = 0; i < 5; i++) {
      if (parent.id !== '') {
        return parent.id;
      } else {
        parent = parent.parentElement;
      }
    }
    this.setState({
      message: 'Could not find an id.',
    });
    return '';
  }

  findObject(id: string, array: Array<VehicleModel|JobModel>): VehicleModel|JobModel {
    return array.find(veh => veh._id === id) as VehicleModel|JobModel;
  }
  //#endregion

  render() {
    const {allVehicles, selectedVehicleIndex, selectedJobIndex} = this.state;
    return (
      <div className="maincontainer">
        <div className="datadisplaycontainer"> 
          <p>Data Output</p>
          <VehicleList
            selectVehicleIndex={selectedVehicleIndex}
            selectJobIndex={selectedJobIndex}
            allVehicles={allVehicles}
            updateVehicles={this.updateVehicle}
            updateJobs={this.updateJob}
            newVehicle={this.createNewVehicle}
            newJob={this.createNewJob}
            handleVehicleSelect={this.handleSelectedVehicle}
            handleJobSelect={this.handleSelectedJob}
          />
        </div>
        <Controlls
          onGetVehiclesClick={this.onGetVehiclesClick}
          onGetJobsClick={this.onGetJobsClick}
          getOneVehicle={this.getOneVehicle}
        />
      </div>
    );
  }
}

export default MainPage;
