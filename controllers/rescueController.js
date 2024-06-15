const { StatusCodes } = require("http-status-codes");
const Rescue = require("../models/Rescue");
const CustomError = require("../errors");

const createRescue = async (req, res) => {
  const { pet_details } = req.body;

  const result = await Rescue.create({
    user_id: req.user.userId,
    pet_details,
    request_date: new Date(),
  });

  res.status(StatusCodes.CREATED).json({ result });
};

const getRescue = async (req, res) => {
  const { id } = req.params;
  const result = await Rescue.findOne({ _id: id });
  if (!result) {
    throw new CustomError.NotFoundError("Rescue request not found");
  }
  res.status(StatusCodes.OK).json({ result });
};

const getAllRescues = async (req, res) => {
  const { status } = req.query;

  const filter = status ? { status } : {};

  const result = await Rescue.find(filter).populate("user_id");

  res.status(StatusCodes.OK).json({ result });
};

const getMyRescues = async (req, res) => {
  const result = await Rescue.find({ user_id: req.user.userId }).populate("user_id");
  res.status(StatusCodes.OK).json({ result });
};

const approveRejectRescue = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const rescue = await Rescue.findOne({ _id: id });
  if (!rescue) {
    throw new CustomError.NotFoundError("Rescue request not found");
  }

  const result = await Rescue.findOneAndUpdate({ _id: id }, { status, response_date: new Date() }, { new: true });

  res.status(StatusCodes.OK).json({ result });
};

module.exports = {
  createRescue,
  getRescue,
  getAllRescues,
  getMyRescues,
  approveRejectRescue,
};
