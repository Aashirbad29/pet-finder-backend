const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const createTokenUser = require("../utils/createTokenUser");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  const token = user.createJWT();

  res.status(StatusCodes.OK).send({ tokenUser, token });
};

const register = async (req, res) => {
  const { email } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create(req.body);

  const tokenUser = createTokenUser(user);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ tokenUser, token });
};

module.exports = { login, register };
