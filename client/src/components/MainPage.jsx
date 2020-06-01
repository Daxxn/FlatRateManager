import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import VehicleDisplay from './VehicleDisplay';
import JobDisplay from './JobDisplay';
import '../styles/MainPage.css';
import APIControl from '../APIControls/APIControl';
import VehicleList from './VehicleList';
import Controlls from './Controlls';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      allVehicles: [],
      allJobs: [],

      selectedVehicleID: '',
      selectedVehicleIndex: 0,
      returnedVehicle: null,
    };
    this.URLBuilder = new APIControl(props.APIData);

    this.onGetVehiclesClick = this.onGetVehiclesClick.bind(this);
    this.onGetJobsClick = this.onGetJobsClick.bind(this);
    this.getOneVehicle = this.getOneVehicle.bind(this);

    this.selectVehicleTest = this.selectVehicleTest.bind(this);
    this.updateVehicle = this.updateVehicle.bind(this);
    this.createNewVehicle = this.createNewVehicle.bind(this);
  }

  componentDidMount() {
    this.getallVehiclesDB();
    this.getallJobsDB();
  }

  //#region API Fetch Requests
  /**
   * Sends GET request for all VEHICLES.
   */
  // getallVehiclesDB() {
  //   fetch(this.props.APIData.APIBase + this.props.APIData.APIVehicles, {
  //     method: this.props.APIData.methods.get,
  //     headers: this.props.APIData.headers,
  //   })
  //   .then((res) => {
  //     res.json()
  //       .then((data) => {
  //         console.log(data);
  //         this.setState({
  //           allVehicles: data,
  //         });
  //       })
  //     .catch((err) => {
  //       this.setState({
  //         message: err,
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     this.setState({
  //       message: err,
  //     });
  //   })
  // }
  getallVehiclesDB() {
    fetch(this.props.APIData.APIBase + this.props.APIData.APIVehicles, {
        method: this.props.APIData.methods.get,
        headers: this.props.APIData.headers,
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
   * Sends GET request for all JOBS.
   */
  // getallJobsDB() {
  //   fetch(this.URLBuilder.buildURL('/jobs'), this.URLBuilder.buildGetMessage())
  //   .then((res) => {
  //     res.json()
  //       .then((data) => {
  //         this.setState({
  //           allJobs: data,
  //         });
  //       })
  //       .catch((err) => {
  //         this.setState({
  //           message: err,
  //         });
  //       })
  //   })
  //   .catch((err) => {
  //     this.setState({
  //       message: err,
  //     });
  //   });
  // }
  getallJobsDB() {
    fetch(this.URLBuilder.buildURL('/jobs'), this.URLBuilder.buildGetMessage())
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          allJobs: data,
        });
      })
      .catch((err) => {
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
  getOneVehicle(id) {
    fetch(this.URLBuilder.buildURL('/vehicles', id), this.URLBuilder.buildGetMessage())
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

  // postVehicle(vehicle) {
  //   fetch(this.URLBuilder.buildPlainURL('/vehicles'), this.URLBuilder.buildPostMessage(vehicle))
  //   .then((data) => {
  //   })
  // }

  patchVehicles(vehicles) {
    fetch(this.URLBuilder.buildPlainURL('/vehicles/many'), this.URLBuilder.buildPatchMessage(vehicles))
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
  //#endregion

  onGetVehiclesClick() {
    this.getallVehiclesDB();
  }

  onGetJobsClick() {
    this.getallJobsDB();
  }

  /**
   * Vehicle element selected event test.
   * @param {Event} e event args
   */
  selectVehicleTest(e) {
    const id = this.findObjectID(e.target);
    const index = this.state.allVehicles.findIndex(vehicle => vehicle._id === id);
    //console.log(id);
    this.setState({
      selectedVehicleID: id,
      selectedVehicleIndex: index,
    });
  }

  //#region Vehicle Controls
  updateVehicle(id, key, data) {
    const newVehicle = this.findObject(id, this.state.allVehicles);
    const index = this.state.allVehicles.findIndex(vehicle => vehicle._id === id);
    newVehicle[key] = data;
    console.log(newVehicle[key]);
    this.setState(prevState => {
      prevState.allVehicles[index] = newVehicle;
      return { allVehicles: prevState.allVehicles };
    });
  }

  createNewVehicle() {
    const newVehicle = {
      make: '',
      model: '',
      year: 0,
      jobs: [],
    };
    const tempVehicles = this.state.allVehicles;
    tempVehicles.push(newVehicle);
    this.setState({
      allVehicles: tempVehicles,
    });
  }
  //#endregion
  
  //#region Helper Methods:
  /**
   * Searches 4 nodes up the DOM tree to find a valid id.
   * Only used during list click events.
   * @param {Object} target initial HTML element from event
   */
  findObjectID(target) {
    let parent = target;
    for(let i = 0; i < 5; i++) {
      if (parent.id !== '') {
        return parent.id;
      } else {
        parent = parent.parentNode;
      }
    }
    this.setState({
      message: new Error('Could not find an id.'),
    });
  }

  findObject(id, array) {
    return array.find(veh => veh._id === id);
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
            newVehicle={this.createNewVehicle}/>
          <JobDisplay allJobs={this.state.allJobs} />
        </div>
        {/* <div className="controlscontainer">
          <div className="getbuttonsitem">
            <button type="button" onClick={this.onGetVehiclesClick}>GET Vehicles</button>
            <button type="button" onClick={this.onGetJobsClick}>GET Jobs</button>
            <button type="button" onClick={() => {this.getOneVehicle(this.state.selectedVehicleID)}}>GET Selected vehicle</button>
          </div>
        </div> */}
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
MainPage.propTypes = {
  APIData: PropTypes.object.isRequired,
};

export default MainPage;