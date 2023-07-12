const ClothingItem = require("../models/clothingItem");
const { errors } = require("../utils/errors");


// const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const combinedItemError = (req, res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(errors.BAD_REQUEST).send({
      message: "Invalid data passed for creating or updating a item.",
    });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(errors.NOT_FOUND).send({
      message: "Card ID not found.",
    });
  }
  return res.status(errors.SERVER_ERROR).send({ message: "An error has occurred" });
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
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(errors.FORBIDDEN)
          .send({ message: "You are not authorized to delete this item" });
      }
      return item.deleteOne().then(() => {
        res.send({ message: "Item removed" });
      });
    })
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