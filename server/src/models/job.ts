import mongoose, { Model, Schema, Document } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const JobSchema = new Schema({
  name: { type: String, required: true },
  time: { type: Number, required: true },
  desc: { type: String, default: '' },
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now() },
  tags: [String],
});

export type AllJobs = {
  job: JobDoc;
};

export type JobObjects = {
  [id: string]: JobDoc;
};

export interface JobDoc extends Document {
  name: string;
  time: number;
  desc: string;
  active: boolean;
  date: Date;
  tags: string[];
}

export type JobModel = Model<JobDoc>;

export function createJobModel(db: typeof mongoose): JobModel {
  return db.model<JobDoc>('jobs', JobSchema);
}
