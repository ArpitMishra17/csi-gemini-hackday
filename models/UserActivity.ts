import mongoose, { Schema, Document, Model } from 'mongoose';

export type ActivityType =
    | 'scenario_start'
    | 'scenario_complete'
    | 'chat_message'
    | 'career_explore'
    | 'onboarding_complete'
    | 'login'
    | 'page_visit';

export interface IActivityMetadata {
    careerId?: mongoose.Types.ObjectId;
    scenarioId?: mongoose.Types.ObjectId;
    pagePath?: string;
    details?: string;
    careerName?: string;
    scenarioTitle?: string;
}

export interface IUserActivity extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    activityType: ActivityType;
    metadata: IActivityMetadata;
    createdAt: Date;
    updatedAt: Date;
}

const ActivityMetadataSchema = new Schema<IActivityMetadata>(
    {
        careerId: { type: Schema.Types.ObjectId, ref: 'Career' },
        scenarioId: { type: Schema.Types.ObjectId, ref: 'Scenario' },
        pagePath: { type: String },
        details: { type: String },
        careerName: { type: String },
        scenarioTitle: { type: String },
    },
    { _id: false }
);

const UserActivitySchema = new Schema<IUserActivity>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        activityType: {
            type: String,
            enum: [
                'scenario_start',
                'scenario_complete',
                'chat_message',
                'career_explore',
                'onboarding_complete',
                'login',
                'page_visit',
            ],
            required: true,
        },
        metadata: {
            type: ActivityMetadataSchema,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient queries on user activities
UserActivitySchema.index({ userId: 1, createdAt: -1 });
UserActivitySchema.index({ userId: 1, activityType: 1 });

const UserActivity: Model<IUserActivity> =
    mongoose.models.UserActivity ||
    mongoose.model<IUserActivity>('UserActivity', UserActivitySchema);

export default UserActivity;
