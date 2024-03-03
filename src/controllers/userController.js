const Joi = require("joi");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const checkDublicate = require("../services/userService");
const createToken = require("../services/authService");
const handleJoiError = require('../helpers/joiHelper')
dotenv.config();

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const signUp = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    const { error } = registrationSchema.validate({
      name,
      age,
      email,
      password,
    });

    if (error) {
        return handleJoiError(error, res);
        }

    const userExists = await checkDublicate(email);

    if (userExists) {
      return res.status(409).json({ message: error.details[0].message });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      age,
      email,
      password: hashPass,
    });

    const savedUser = await newUser.save();

    await savedUser.save();

    res.status(201).json({
      user: {
        name: savedUser.name,
        age: savedUser.age,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return handleJoiError(error, res);
    }

    const user = await User.findOne({ email }).select("+password");

    const passMatch = user && (await bcrypt.compare(password, user.password));
    if (!passMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = await createToken(user.id)
    user.token = token;
    await user.save();

    user.password = undefined;

    res.status(200).json({
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};



module.exports = {
  signUp,
  login,
};
