import TrainHistory from "../models/TrainHistory.js";

export const getTrainHistoryByDate = async (req, res) => {
    try {
      const { date, trainName  } = req.query;
  
      if (!date) {
        return res.status(400).json({ message: "Date is required" });
      }
  
      const queryDate = new Date(date);

      const query = {
        date: queryDate,
      };

      if (trainName) {
        query.trainName = trainName;
      }

      // Find the train history by exact date match
      const trainHistory = await TrainHistory.find({
        query,
       });
  
      if (!trainHistory) {
        return res.status(404).json({ message: "Train history not found for the given date" });
      }
  
      res.status(200).json(trainHistory);
    } catch (error) {
      console.error("Error fetching train history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };