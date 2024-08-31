import Train from "../models/Train.js";
import TrainHistory from "../models/TrainHistory.js";
import { route1, route2, route3 } from "../utils/trainRouteData.js";
import getCoordinatesFromOSMId from "../utils/getCoordinatesFromOSMId .js";

export const createTrain = async (req, res, next) => {
  try {
    const train = new Train({
      ...req.body,
    });
    await train.save();
    res.status(201).send("Train has been added");
  } catch (error) {
    next(error);
  }
};

export const updateTrain = async (req, res, next) => {
  try {
    const updatedTrain = await Train.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedTrain) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedTrain);
  } catch (error) {
    next(error);
  }
};

export const removeTrain = async (req, res, next) => {
  try {
    await Train.findByIdAndDelete(req.params.id);
    res.status(200).send("Train has been removed!");
  } catch (error) {
    next(error);
  }
};

const updateTrainLocation = async (route) => {
  let currentIndex = 0;

  const updateLocation = async () => {
    try {
      const { latitude, longitude } = await getCoordinatesFromOSMId(
        route[currentIndex].coordinates
      );
      const trainName = route[currentIndex].trainName;
      const location = route[currentIndex].location;

      await Train.findOneAndUpdate(
        { trainName: trainName },
        {
          location,
          latitude,
          longitude,
        }
      );
      console.log(trainName);
      console.log(
        `Train location updated to ${location}: (${latitude}, ${longitude})`
      );

      const currentDate = new Date().toISOString().split("T")[0];

      const existingRecord = await TrainHistory.findOne({
        trainName,
        date: currentDate,
        "locations.location": location,
      });

      if (!existingRecord) {
        await TrainHistory.findOneAndUpdate(
          { trainName, date: currentDate },
          {
            $push: {
              locations: {
                location,
                latitude,
                longitude,
                arrivalTime: new Date(),
              },
            },
          },
          { upsert: true, new: true }
        );

        console.log(`Historical data updated for ${currentDate}`);
      } else {
        console.log(`Location already recorded for ${currentDate}`);
      }

      currentIndex = (currentIndex + 1) % route.length;
    } catch (error) {
      console.error("Error updating train location:", error);
    }
  };

  await updateLocation();
  setInterval(updateLocation, 60000); // Continue to update every minute
  console.log(`Train location updates started for ${route[0].trainName}!`);
};

const removeOldTrainHistoryRecords = async () => {
  try {
    // Calculate the date 90 days ago from today
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // Find and remove records older than 90 days
    const result = await TrainHistory.deleteMany({
      date: { $lt: ninetyDaysAgo.toISOString().split("T")[0] },
    });

    console.log(`Removed ${result.deletedCount} old train history records.`);
  } catch (error) {
    console.error("Error removing old train history records:", error);
  }
};

const scheduleOldHistoryCleanup = () => {
  // Run the cleanup process once a day
  setInterval(removeOldTrainHistoryRecords, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

  console.log("Scheduled daily cleanup of old train history records.");
};

export const startTrainLocationUpdates = () => {
  const routes = [route1, route2, route3];

  routes.forEach((route) => {
    updateTrainLocation(route);
  });
  scheduleOldHistoryCleanup();
};

export const getAllTrains = async (req, res, next) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    next(error);
  }
};

export const getTrainById = async (req, res, next) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    res.status(200).json({
      latitude: train.latitude,
      longitude: train.longitude,
      location: train.location,
    });
  } catch (error) {
    console.error("Error fetching train data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
