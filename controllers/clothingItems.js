const ClothingItem = require("../models/clothingItem");

const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const combinedItemError = (req, res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    let statusCode = ERROR_400;
    let errorMessage = "Invalid data passed for creating or updating an item.";

    if (err.name === "CastError") {
      errorMessage = "Invalid ID.";
    }

    if (err.name === "DocumentNotFoundError") {
      statusCode = ERROR_404;
      errorMessage = "Card ID not found.";
    }

    return res.status(statusCode).send({
      message: errorMessage,
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
      combinedItemError(req, res, e);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      combinedItemError(req, res, e);
    });
};

const updateItems = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      combinedItemError(req, res, e);
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((e) => {
      combinedItemError(req, res, e);
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
      combinedItemError(req, res, e);
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
      combinedItemError(req, res, e);
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