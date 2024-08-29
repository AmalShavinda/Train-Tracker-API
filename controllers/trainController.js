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

export const updateTrain1Location = async (req, res, next) => {
  try {
    let currentIndex = 0;

    const updateLocation = async () => {
      try {
        const { latitude, longitude } = await getCoordinatesFromOSMId(
          route1[currentIndex].coordinates
        );
        const trainName = route1[currentIndex].trainName;
        const location = route1[currentIndex].location;

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

        //history data
        const currentDate = new Date().toISOString().split('T')[0];
        const historyRecord = await TrainHistory.findOneAndUpdate(
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

        currentIndex = (currentIndex + 1) % route1.length;
      } catch (error) {
        console.error("Error updating train location:", error);
      }
    };

    await updateLocation();

    setInterval(updateLocation, 60000);

    console.log("Train location updates have started!");
  } catch (error) {
    console.error("Error updating train location:", error);
  }
};

export const updateTrain2Location = async (req, res, next) => {
  try {
    let currentIndex = 0;

    const updateLocation = async () => {
      try {
        const { latitude, longitude } = await getCoordinatesFromOSMId(
          route2[currentIndex].coordinates
        );
        const trainName = route2[currentIndex].trainName;
        const location = route2[currentIndex].location;

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

        //history data
        const currentDate = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
        const historyRecord = await TrainHistory.findOneAndUpdate(
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

        currentIndex = (currentIndex + 1) % route2.length;
      } catch (error) {
        console.error("Error updating train location:", error);
      }
    };

    await updateLocation();

    setInterval(updateLocation, 60000);

    console.log("Train location updates have started!");
  } catch (error) {
    console.error("Error updating train location:", error);
  }
};

export const updateTrain3Location = async (req, res, next) => {
  try {
    let currentIndex = 0;

    const updateLocation = async () => {
      try {
        const { latitude, longitude } = await getCoordinatesFromOSMId(
          route3[currentIndex].coordinates
        );
        const trainName = route3[currentIndex].trainName;
        const location = route3[currentIndex].location;

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

        //history data
        const currentDate = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
        const historyRecord = await TrainHistory.findOneAndUpdate(
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

        currentIndex = (currentIndex + 1) % route3.length;
      } catch (error) {
        console.error("Error updating train location:", error);
      }
    };

    await updateLocation();

    setInterval(updateLocation, 60000);

    console.log("Train location updates have started!");
  } catch (error) {
    console.error("Error updating train location:", error);
  }
};

export const updateTrain4Location = async (req, res, next) => {
  try {
    let currentIndex = 0;

    const updateLocation = async () => {
      try {
        const { latitude, longitude } = await getCoordinatesFromOSMId(
          route3[currentIndex].coordinates
        );
        const trainName = route3[currentIndex].trainName;
        const location = route3[currentIndex].location;

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

        //history data
        const currentDate = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
        const historyRecord = await TrainHistory.findOneAndUpdate(
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

        currentIndex = (currentIndex + 1) % route3.length;
      } catch (error) {
        console.error("Error updating train location:", error);
      }
    };

    await updateLocation();

    setInterval(updateLocation, 60000);

    console.log("Train location updates have started!");
  } catch (error) {
    console.error("Error updating train location:", error);
  }
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
    const train = await Train.findById(req.params.id); // Using findById for better readability

    if (!train) {
      return res.status(404).json({ message: "Train not found" }); // Return JSON response
    }

    res.status(200).json({
      latitude: train.latitude,
      longitude: train.longitude,
      location: train.location,
    });
  } catch (error) {
    console.error("Error fetching train data:", error); // Log the error for debugging
    res.status(500).json({ message: "Server Error" }); // Return a JSON error response
  }
};
