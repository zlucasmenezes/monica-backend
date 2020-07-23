import { model, Schema, Model } from 'mongoose';
import { IThing, IThingPopulated } from '../models/thing.model';

const ThingSchema = new Schema<IThing>(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 64
    },
    type: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 64
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    sensors: [{
      type: Schema.Types.ObjectId,
      ref: 'Sensor'
    }],
  },
  {
    timestamps: true
  }
);

ThingSchema.statics.findByIdAndPopulate = async function(this: IThingModel, thingId: string) {
  return this.findById(thingId).populate('project').populate('sensors').exec();
};

ThingSchema.statics.findByProjectAndPopulate = async function(this: IThingModel, projectId: string) {
  return this.find({ project: projectId }).populate('project').populate('sensors').exec();
};

const Thing: IThingModel = model<IThing, IThingModel>('Thing', ThingSchema, 'things');
export default Thing;

interface IThingModel extends Model<IThing> {
  findByIdAndPopulate(thingId: string): Promise<IThingPopulated>;
  findByProjectAndPopulate(projectId: string): Promise<IThingPopulated[]>;
}
