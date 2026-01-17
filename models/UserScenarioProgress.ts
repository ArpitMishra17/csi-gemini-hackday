import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserChoice {
  stageId: string;
  optionId: string;
  timestamp: Date;
}

export interface IEvaluation {
  strengths: string[];
  areasToImprove: string[];
}

export interface IUserScenarioProgress extends Document {
  _id: mongoose.Types.ObjectId;
  odUserId: string;
  scenarioId: mongoose.Types.ObjectId;
  careerId: mongoose.Types.ObjectId;
  currentStageId: string;
  choices: IUserChoice[];
  completed: boolean;
  evaluation: IEvaluation | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserChoiceSchema = new Schema<IUserChoice>(
  {
    stageId: { type: String, required: true },
    optionId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const EvaluationSchema = new Schema<IEvaluation>(
  {
    strengths: [{ type: String }],
    areasToImprove: [{ type: String }],
  },
  { _id: false }
);

const UserScenarioProgressSchema = new Schema<IUserScenarioProgress>(
  {
    odUserId: {
      type: String,
      required: true,
    },
    scenarioId: {
      type: Schema.Types.ObjectId,
      ref: 'Scenario',
      required: true,
    },
    careerId: {
      type: Schema.Types.ObjectId,
      ref: 'Career',
      required: true,
    },
    currentStageId: {
      type: String,
      required: true,
    },
    choices: [UserChoiceSchema],
    completed: {
      type: Boolean,
      default: false,
    },
    evaluation: {
      type: EvaluationSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserScenarioProgressSchema.index({ odUserId: 1, scenarioId: 1 }, { unique: true });

const UserScenarioProgress: Model<IUserScenarioProgress> =
  mongoose.models.UserScenarioProgress ||
  mongoose.model<IUserScenarioProgress>('UserScenarioProgress', UserScenarioProgressSchema);

export default UserScenarioProgress;
