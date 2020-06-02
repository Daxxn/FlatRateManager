export default interface VehicleModel {
  _id: string,
  _selected: boolean,
  make: string,
  model: string,
  year: number
};

export default class VehicleModel {
  constructor(id: string, make: string, model: string, year: number) {
    this._id = id;
    this._selected = false;
    this.make = make;
    this.model = model;
    this.year = year;
  }
}