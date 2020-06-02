export default interface JobModel {
  id: string,
  job: string,
  time: number,
};

export default class JobModel {
  constructor(id: string, job: string, time: number) {
    this.id = id;
    this.job = job;
    this.time = time;
  }
}