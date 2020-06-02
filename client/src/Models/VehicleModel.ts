export default interface VehicleModel {
  _id: string,
  make: string,
  model: string,
  year: number
};

export default class VehicleModel {
  public _id: string;
  public make: string;
  public model: string;
  public year: number;

  constructor(id: string, make: string, model: string, year: number) {
    this._id = id;
    this.make = make;
    this.model = model;
    this.year = year;
  }
}