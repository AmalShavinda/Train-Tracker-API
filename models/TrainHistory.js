import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
  });
  
  const TrainHistorySchema = new mongoose.Schema({
    trainName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    locations: [LocationSchema],
  });
  
  const TrainHistory = mongoose.model("TrainHistory", TrainHistorySchema);
  export default TrainHistory;