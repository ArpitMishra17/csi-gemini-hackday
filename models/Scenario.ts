import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IScenarioOption {
  id: string;
  text: string;
  skillsRevealed: string[];
  nextStageId: string | null;
}

export interface IScenarioStage {
  stageId: string;
  prompt: string;
  aiSystemContext: string;
  options: IScenarioOption[];
}

export interface IScenario extends Document {
  _id: mongoose.Types.ObjectId;
  careerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  context: string;
  stages: IScenarioStage[];
  createdAt: Date;
  updatedAt: Date;
}

const ScenarioOptionSchema = new Schema<IScenarioOption>(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    skillsRevealed: [{ type: String }],
    nextStageId: { type: String, default: null },
  },
  { _id: false }
);

const ScenarioStageSchema = new Schema<IScenarioStage>(
  {
    stageId: { type: String, required: true },
    prompt: { type: String, required: true },
    aiSystemContext: { type: String, required: true },
    options: [ScenarioOptionSchema],
  },
  { _id: false }
);

const ScenarioSchema = new Schema<IScenario>(
  {
    careerId: {
      type: Schema.Types.ObjectId,
      ref: 'Career',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    context: {
      type: String,
      required: true,
    },
    stages: [ScenarioStageSchema],
  },
  {
    timestamps: true,
  }
);

const Scenario: Model<IScenario> = mongoose.models.Scenario || mongoose.model<IScenario>('Scenario', ScenarioSchema);

export default Scenario;
