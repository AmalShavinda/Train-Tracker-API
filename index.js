import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

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

app.listen(8800, () => {
    connect()
    console.log("Server run on port 8800")
})
