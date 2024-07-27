import Train from "../models/Train.js";

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

export const updateTrainLocation = async (req, res, next) => {
  try {
    const latitude = await Train.findByIdAndUpdate(req.params.id, {
      latitude: req.body.latitude,
    });
    const longitude = await Train.findByIdAndUpdate(req.params.id, {
      longitude: req.body.longitude,
    });
    res.status(200).send(latitude, longitude, "Train location has been updated!");
  } catch (error) {
    next(error);
  }
};
