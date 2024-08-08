import Train from "../models/Train.js";
import { route1 } from "../utils/trainRouteData.js";
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

export const removeTrain = async (req, res, next) => {
  try {
    await Train.findByIdAndDelete(req.params.id);
    res.status(200).send("Train has been removed!");
  } catch (error) {
    next(error);
  }
};

// export const updateTrainLocation = async (req, res, next) => {
//   try {
//     const latitude = await Train.findByIdAndUpdate(req.params.id, {
//       latitude: req.body.latitude,
//     });
//     const longitude = await Train.findByIdAndUpdate(req.params.id, {
//       longitude: req.body.longitude,
//     });
//     res
//       .status(200)
//       .send(latitude, longitude, "Train location has been updated!");
//   } catch (error) {
//     next(error);
//   }
// };

export const updateTrainLocation = async (req, res, next) => {
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
        console.log(trainName)
        console.log(
          `Train location updated to ${location}: (${latitude}, ${longitude})`
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
    res.status(200).json(train);
  } catch (error) {
    next(error);
  }
};
