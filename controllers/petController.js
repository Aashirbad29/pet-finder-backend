const { StatusCodes } = require("http-status-codes");
const Pet = require("../models/Pet");

const create = async (req, res) => {
  const { species, breed, age, gender, description, vaccination_status, photo } = req.body;

  const result = await Pet.create({
    species,
    breed,
    age,
    gender,
    description,
    vaccination_status,
    photo,
  });

  res.status(StatusCodes.CREATED).json({ result });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { species, breed, age, gender, description, vaccination_status, photo } = req.body;

  const result = await Pet.findByIdAndUpdate(
    id,
    { species, breed, age, gender, description, vaccination_status, photo },
    { new: true, runValidators: true }
  );

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Pet not found" });
  }

  res.status(StatusCodes.OK).json({ result });
};

const get = async (req, res) => {
  const { id } = req.params;
  const result = await Pet.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ result });
};

const getAll = async (req, res) => {
  const result = await Pet.find({});

  res.status(StatusCodes.OK).json({ result });
};

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await Pet.findById(id);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Pet not found" });
  }

  await result.remove();

  res.status(StatusCodes.OK).json({ message: "Pet deleted successfully" });
};

module.exports = { create, getAll, get, update, remove };
