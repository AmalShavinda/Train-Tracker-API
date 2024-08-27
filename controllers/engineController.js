import Engine from "../models/Engine.js"

export const addEngine = async (req, res, next) => {
    try {
        const engine = new Engine({
            ...req.body
        })
        await engine.save()
        res.status(201).send("Engine has been added")
    } catch (error) {
        next(error)
    }
}

export const getEngines = async (req, res, next) => {
    try {
        const engines = await Engine.find()
        res.status(200).json(engines)
    } catch (error) {
        next(error)
    }
}

export const getEngineById = async (req, res, next) => {
    try {
        const engine = await Engine.findById(req.params.id)
        res.status(200).json(engine)
    } catch (error) {
        next(error)
    }
}

export const updateEngine = async (req, res, next) => {
    try {
      const updatedEngine = await Engine.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      if (!updateEngine) {
        return res.status(404).json({ message: "Engine not found" });
      }
      res.status(200).json(updatedEngine);
    } catch (error) {
      next(error);
    }
  };

export const removeEngine = async (req, res, next) => {
    try {
        await Engine.findByIdAndDelete(req.params.id)
        res.status(200).send("Engine has been removed")
    } catch (error) {
        next(error)
    }
}