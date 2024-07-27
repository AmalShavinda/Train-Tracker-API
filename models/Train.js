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
  latitude: {
    type: String,
    default: ""
  },
  longitude: {
    type: String,
    default: ""
  },
});

export default mongoose.model("train", TrainSchema);
