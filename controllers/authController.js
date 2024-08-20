import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const exsistingUser = await User.findOne({ username });
    const exsistingEmail = await User.findOne({ email });

    if (exsistingUser || exsistingEmail) {
      return res.status(400).send("User or Email already taken");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or usernames"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ details: { ...otherDetails } });
  } catch (error) {
    next(error);
  }
};
