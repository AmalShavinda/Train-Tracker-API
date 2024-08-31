import TrainHistory from "../models/TrainHistory.js";

export const getTrainHistoryByDate = async (req, res) => {
  try {
    const { date, trainName } = req.query;

    // Ensure both date and trainName are provided
    if (!date || !trainName) {
      return res.status(400).json({ message: "Date and train name are required" });
    }

    // Convert the date to ISO format to match stored format
    const queryDate = new Date(date).toISOString().split('T')[0];

    // Find the train history by train name and exact date match
    const trainHistory = await TrainHistory.findOne({
      trainName,
      date: queryDate,
    });

    if (!trainHistory) {
      return res.status(404).json({ message: "Train history not found for the given date and train name" });
    }

    res.status(200).json(trainHistory);
  } catch (error) {
    console.error("Error fetching train history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};