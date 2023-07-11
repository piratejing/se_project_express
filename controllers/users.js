const User = require("../models/user");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const combinedItemError = (req, res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(ERROR_400).send({
      message: "Invalid data passed for creating or updating a user.",
    });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message: "User ID not found.",
    });
  }
  return res.status(ERROR_500).send({ message: "An error has occurred" });
};


const getUser = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      combinedItemError(req, res, e);
    });
};

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      combinedItemError(req, res, e);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      combinedItemError(req, res, e);
    });
};

module.exports = {
  getUser,
  getUserId,
  createUser,
};