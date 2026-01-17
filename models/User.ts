
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        maxlength: [100, "Email cannot be more than 100 characters"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isOnboarded: {
        type: Boolean,
        default: false,
    },
    onboardingData: {
        age: String,
        gender: String,
        grade: String,
        skills: String,
        interests: String,
        aims: String,
        personalityAnswers: {
            type: Map,
            of: String,
        },
        situationPreference: String,
        explorationPreference: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
