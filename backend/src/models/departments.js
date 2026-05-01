import { Schema, model } from "mongoose";

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true,
    },
    departmentCode: {
        type: Number,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Department", departmentSchema);