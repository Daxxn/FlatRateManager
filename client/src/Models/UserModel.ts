export default interface UserModel {
  _id: string;
  userName: string;
}

export default class UserModel {
  constructor(id: string, userName: string) {
    this._id = id;
    this.userName = userName;
  }
}