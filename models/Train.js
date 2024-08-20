import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
  trainName: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: ""
  },
  latitude: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("train", TrainSchema);
