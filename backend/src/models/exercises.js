import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    videoUrl: {
        type: String,
        required: false
    },
    muscleGroup: {
        type: String,
        required: false
    },
    difficulty: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: false
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;