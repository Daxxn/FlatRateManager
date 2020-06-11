interface JobModel {
  _id: string,
  job: string,
  time: number,
  changeProperty: (propName: string, value: string | number) => void;
};

class JobModel {
  constructor(id: string, job: string, time: number) {
    this._id = id;
    this.job = job;
    this.time = time;
  }

  changeProperty = (propName: string, value: string | number): void => {
    if (propName === 'job') {
      this.job = value as string;
    } else if (propName === 'time') {
      this.time = value as number;
    }
  }
}

export default JobModel;