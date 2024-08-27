import mongoose from "mongoose";

const EngineSchema = new mongoose.Schema({
    engineId: {
        type: String,
        required: true
    },
    engineType: {
        type: String,
        required: true
    },
    engineRoute: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "FTA" //FTA = free to attached, ATT = attached, UNM = under maintain
    },
})

export default mongoose.model("engine", EngineSchema);