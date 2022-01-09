import mongoose, { Model, Schema, Document } from 'mongoose';
import { TechObjects } from './tech';
import { JobObjects } from './job';

const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true },
  authId: { type: String, required: true },
  techs: [{ type: ObjectId, ref: 'techs' }],
  jobs: [{ type: ObjectId, ref: 'jobs' }],
});

export type UserData = {
  user: UserDoc;
  techs: TechObjects;
  jobs: JobObjects;
};

export interface UserDoc extends Document {
  username: string;
  authId: string;
  techs: [typeof ObjectId];
  jobs: [typeof ObjectId];
}

export type UserModel = Model<UserDoc>;

export function createUserModel(db: typeof mongoose): UserModel {
  return db.model<UserDoc>('users', UserSchema);
}
