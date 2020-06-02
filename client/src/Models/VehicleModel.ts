export default interface VehicleModel {
  make: string,
  model: string,
  year: number
};

export default class VehicleModel {
  public make: string;
  public model: string;
  public year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}