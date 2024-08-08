import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import trainRoute from "./routes/trainRoute.js"
import { updateTrainLocation } from "./controllers/trainController.js";


const app = express()

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error
    }

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB Disconnected")
    })
}

updateTrainLocation();

// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/train', trainRoute)



app.listen(8800, () => {
    connect()
    console.log("Server run on port 8800")
})
