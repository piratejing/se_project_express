const ClothingItem = require("../models/clothingItem");

const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const regularItemError = (req, res, err) => {
  if (err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message: "Invalid data passed for creating or updating an item.",
    });
  }
  if (err.name === "CastError") {
    return res.status(ERROR_400).send({
      message: "Invalid ID.",
    });
  }
  return res.status(ERROR_500).send({ message: "An error has occurred" });
};

const findByIdItemError = (req, res, err) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message: "Invalid data passed for creating or updating an item.",
    });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message: "Invalid ID.",
    });
  }
  return res.status(ERROR_500).send({ message: "An error has occurred" });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

const updateItems = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(() =>
      res.status(200).send({ message: "Item has successfully been liked" })
    )
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};
const disLikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};


module.exports = {
  createItem,
  getItems,
  updateItems,
  deleteItems,
  likeItem,
  disLikeItem,
};