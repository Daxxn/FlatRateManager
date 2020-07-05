export default interface JobModel {
  _id: string;
  job: string;
  time: number;
}

export default class JobModel {
  constructor(id: string, job: string, time: number) {
    this._id = id;
    this.job = job;
    this.time = time;
  }
}