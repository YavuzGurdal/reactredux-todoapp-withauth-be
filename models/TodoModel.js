// import mongoose from "mongoose";
const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        todo: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);