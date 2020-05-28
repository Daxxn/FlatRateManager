import APIControl from "./APIControl";

export default class JobsControl extends APIControl {
  constructor(APIData) {
    super(APIData);
    this.endpoint = 'jobs';
  }

  getAllJobs() {
    // let response = {
    //   message: '',
    //   allJobs: [],
    // };
    fetch(this.buildURL(this.APIData.APIJobs), {
      method: this.APIData.methods.get,
      headers: this.APIData.headers,
    })
    .then((res) => {
      res.json()
        .then((data) => {
          return {
            message: 'pass',
            allJobs: data,
          };
        })
        .catch((err) => {
          return {
            message: err,
          };
        })
    })
    .catch((err) => {
      return {
        message: err,
      };
    });
  }

  getJob(jobID) {
    let output = {
      message: '',
      job: undefined,
    };
    fetch(this.buildURL(this.endpoint, jobID), {
      method: this.APIData.methods.get,
      headers: this.APIData.headers,
    })
    .then((res) => {
      res.json()
        .then((data) => {
          output = {
            message: 'pass',
            job: data,
          };
        })
        .catch((err) => {
          output = {
            message: err,
          };
        })
    })
    .catch((err) => {
      output = {
        message: err,
      };
    });
    return output;
  }
}
