import mongoose from "mongoose";

const exerciseInSessionSchema = new mongoose.Schema({
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
    },
    sets: Number,
    reps: Number,
    restSeconds: Number,
});

const sessionSchema = new mongoose.Schema({
    sessionIndex: {
        type: Number,
        required: true,
    },
    title: String,

    exercises: [exerciseInSessionSchema],
});

const userWorkoutPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // 🔥 un plan por usuario
    },

    sessions: [sessionSchema],
}, {
    timestamps: true,
});

export default mongoose.model("UserWorkoutPlan", userWorkoutPlanSchema);