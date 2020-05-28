import APIControl from "./APIControl";

export default class VehicleControl extends APIControl {
  constructor(APIData) {
    super(APIData);
    this.endpoint = 'vehicles';
  }

  async getAllVehicles() {
    // let response = {
    //   message: '',
    //   allVehicles: [],
    // };
    await fetch(this.buildURL(this.APIData.APIVehicles), {
      method: this.APIData.methods.get,
      headers: this.APIData.headers,
    })
    .then((res) => {
      res.json()
        .then((data) => {
          console.log(data);
          return {
            message: 'pass',
            allVehicles: data,
          };
        })
      .catch((err) => {
        return {
          message: err,
        };
      });
    })
    .catch((err) => {
      return {
        message: err,
      };
    })
  }

  getVehicle(vehicleID) {
    let response = {
      message: '',
      vehicle: undefined,
    };
    fetch(this.buildURL(this.endpoint, vehicleID), {
      method: this.APIData.methods.get,
      headers: this.APIData.headers,
    })
    .then((res) => {
      res.json()
        .then((data) => {
          console.log(data);
          response = {
            vehicle: data,
          };
        })
      .catch((err) => {
        response = {
          message: err,
        };
      });
    })
    .catch((err) => {
      response = {
        message: err,
      };
    })

    return response;
  }
}