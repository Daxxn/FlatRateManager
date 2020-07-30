export default interface JobModel {
  _id: string;
  job: string;
  time: number;

  build: (job: string, time: number) => JobModel;
}

export default class JobModel {
  constructor(id: string, job: string, time: number) {
    this._id = id;
    this.job = job;
    this.time = time;
  }

  static build = (job: string, time: number): JobModel => {
    return {
      job,
      time,
    } as JobModel;
  }
}