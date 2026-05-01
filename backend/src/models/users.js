import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "is invalid"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin"
    },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.models.User || mongoose.model("User", userSchema);