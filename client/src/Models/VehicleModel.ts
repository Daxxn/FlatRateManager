export default interface VehicleModel {
  id: string,
  make: string,
  model: string,
  year: number
};

export default class VehicleModel {
  public id: string;
  public make: string;
  public model: string;
  public year: number;

  constructor(id: string, make: string, model: string, year: number) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
  }
}