import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true
    },
    routeName: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },


})