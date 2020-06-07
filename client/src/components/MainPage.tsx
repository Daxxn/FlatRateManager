import React, { Component } from 'react';
//import PropTypes from 'prop-types';
// import VehicleDisplay from './VehicleDisplay';
import JobDisplay from './JobDisplay';
import '../styles/MainPage.css';
import VehicleList from './VehicleList';
import Controlls from './Controlls';
import VehicleModel from '../Models/VehicleModel';
import JobModel from '../Models/JobModel';
//import APIModel from '../APIControls/DataModels/APIModel';
import APIControl from '../APIControls/APIControl';

export interface Props {
  APIData: object,
  URLBuilder: APIControl,
}

export interface State {
  allVehicles: VehicleModel[],
  allJobs: JobModel[],
  message: string,
  selectedVehicleID: string,
  selectedVehicleIndex: number,
  returnedVehicle: VehicleModel,
}

class MainPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
      allVehicles: [],
      allJobs: [],

      selectedVehicleID: '',
      selectedVehicleIndex: 0,
      returnedVehicle: new VehicleModel('null', '', '', 0, []),
    };

    this.onGetVehiclesClick = this.onGetVehiclesClick.bind(this);
    this.onGetJobsClick = this.onGetJobsClick.bind(this);
    this.getOneVehicle = this.getOneVehicle.bind(this);

    this.selectVehicleTest = this.selectVehicleTest.bind(this);
    this.updateVehicle = this.updateVehicle.bind(this);
    this.createNewVehicle = this.createNewVehicle.bind(this);
    this.handleSelectedVehicle = this.handleSelectedVehicle.bind(this);
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

  handleSelectedVehicle(id: string) {
    const index = this.state.allVehicles.findIndex(vehicle => vehicle._id === id);
    this.setState({
      selectedVehicleIndex: index,
    });
  }

  /**
   * Vehicle element selected event test.
   * @param {Event} e event args
   */
  selectVehicleTest(e: any) {
    const id = this.findObjectID(e.target);
    const index = this.state.allVehicles.findIndex(vehicle => vehicle._id === id);
    //console.log(id);
    this.setState({
      selectedVehicleID: id,
      selectedVehicleIndex: index,
    });
  }

  //#region Vehicle Controls
  updateVehicle(id: string, key: string, data: VehicleModel) {
    const newVehicle = this.findObject(id, this.state.allVehicles);
    const index = this.state.allVehicles.findIndex(vehicle => vehicle._id === id);
    // @ts-ignore: Key can be accessed with string. TS doesnt like it.
    newVehicle[key] = data;
    // @ts-ignore: Key can be accessed with string. TS doesnt like it.
    console.log(newVehicle[key]);
    this.setState(prevState => {
      prevState.allVehicles[index] = newVehicle as VehicleModel;
      return { allVehicles: prevState.allVehicles };
    });
  }

  createNewVehicle() {
    const newVehicle = new VehicleModel('', 'blank', 'blank', 0, []);
    const tempVehicles = this.state.allVehicles;
    // this.testURLBuilder(newVehicle);
    tempVehicles.push(newVehicle);
    this.setState({
      allVehicles: tempVehicles,
    });
    this.postNewVehicle(newVehicle);
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
    return (
      <div className="maincontainer">
        <div className="datadisplaycontainer"> 
          <p>Data Output</p>
          <VehicleList 
            allVehicles={this.state.allVehicles}
            updateVehicles={this.updateVehicle}
            newVehicle={this.createNewVehicle}
            handleSelection={this.handleSelectedVehicle} />
          <JobDisplay allJobs={this.state.allJobs} />
        </div>
        <Controlls
          onGetVehiclesClick={this.onGetVehiclesClick}
          onGetJobsClick={this.onGetJobsClick}
          getOneVehicle={this.getOneVehicle}
          selectedVehicleID={this.state.selectedVehicleID} />
        <div>
          {this.state.returnedVehicle === (undefined || null) ? <p></p> : <p>{this.state.returnedVehicle.model}</p>}
        </div>
      </div>
    );
  }
}

export default MainPage;