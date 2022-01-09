import mongoose, { Model, Schema, Document } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const TechSchema = new Schema({
  name: { type: String, required: true },
  techNumber: { type: Number, required: true },
  created: { type: Date, default: Date.now() },
  jobs: [{ type: ObjectId, ref: 'jobs' }],
});

export type AllTechs = {};

export type TechObjects = {
  [id: string]: TechDoc;
};

export interface TechDoc extends Document {
  name: string;
  techNumber: number;
  created: Date;
  jobs: [typeof ObjectId];
}

export type TechModel = Model<TechDoc>;

export function createTechModel(db: typeof mongoose): TechModel {
  return db.model<TechDoc>('techs', TechSchema);
}
