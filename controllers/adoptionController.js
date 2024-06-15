const { StatusCodes } = require("http-status-codes");
const Adoption = require("../models/Adoption");
const CustomError = require("../errors");
const Pet = require("../models/Pet");

const create = async (req, res) => {
  const { pet_id } = req.body;

  const hasAlreadyRequested = await Adoption.findOne({ user_id: req.user.userId, pet_id });

  if (hasAlreadyRequested) {
    throw new CustomError.BadRequestError("Already requested");
  }

  const result = await Adoption.create({
    user_id: req.user.userId,
    pet_id,
    request_date: new Date(),
  });

  res.status(StatusCodes.CREATED).json({ result });
};

const get = async (req, res) => {
  const { id } = req.params;
  const result = await Adoption.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ result });
};

const getAll = async (req, res) => {
  const { status } = req.query;

  const filter = status ? { status } : {};

  const result = await Adoption.find(filter).populate(["user_id", "pet_id"]);

  res.status(StatusCodes.OK).json({ result });
};

const getMyRequests = async (req, res) => {
  const result = await Adoption.find({ user_id: req.user.userId }).populate(["user_id", "pet_id"]);
  res.status(StatusCodes.OK).json({ result });
};

const approveRejectRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const adoption = await Adoption.findOne({ _id: id });
  const hasAlreadyApproved = await Pet.findOne({ _id: adoption.pet_id });

  if (hasAlreadyApproved.is_adopted) {
    throw new CustomError.BadRequestError("Pet is already adopted");
  }

  const result = await Adoption.findOneAndUpdate({ _id: id }, { status: status, response_date: new Date() }, { new: true });

  if (result) {
    await Pet.findOneAndUpdate({ _id: result.pet_id }, { is_adopted: result.status });
  }

  res.status(StatusCodes.OK).json({ result });
};

module.exports = { create, approveRejectRequest, get, getAll, getMyRequests };
