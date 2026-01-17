import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICareer extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  skills: string[];
  suitableFor: ('high_school' | 'college' | 'both')[];
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    skills: [{
      type: String,
    }],
    suitableFor: [{
      type: String,
      enum: ['high_school', 'college', 'both'],
      default: ['both'],
    }],
  },
  {
    timestamps: true,
  }
);

const Career: Model<ICareer> = mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema);

export default Career;
