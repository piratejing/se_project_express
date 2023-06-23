const ClothingItem = require("../models/clothingItem");
const { itemError } = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((e) => itemError(req, res, e));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

const deleteItem = (req, res) => {
  const { itemsId } = req.params;

  ClothingItem.findByIdAndDelete(itemsId)
    .orFail()
    .then((item) => res.send({ item }))
    .catch((e) => itemError(req, res, e));
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemsId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};

// const ClothingItem = require("../models/clothingItem");
// const { regularItemError, findByIdItemError } = require("../utils/errors");

// const createItem = (req, res) => {
//   const { name, weather, imageUrl } = req.body;

//   ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
//     .then((item) => {
//       console.log(item);
//       res.status(200).json({ data: item });
//     })
//     .catch((err) => {
//       console.error(err);
//       regularItemError(req, res, err);
//     });
// };

// const getItems = (req, res) => {
//   ClothingItem.find({})
//     .then((items) => res.status(200).send(items))
//     .catch((err) => {
//       regularItemError(req, res, err);
//     });
// };

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((err) => {
//       regularItemError(req, res, err);
//     });
// };

// const deleteItem = (req, res) => {
//   const { itemId } = req.params;

//   ClothingItem.findByIdAndDelete(itemId)
//     .orFail()
//     .then((item) => res.status(200).send({ item }))
//     .catch((err) => {
//       findByIdItemError(req, res, err);
//     });
// };

// const likeItem = (req, res) => {
//   ClothingItem.findByIdAndUpdate(
//     req.params.itemId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true }
//   )
//     .orFail()
//     .then(() =>
//       res.status(200).send({ message: "Item has successfully been liked" })
//     )
//     .catch((err) => {
//       findByIdItemError(req, res, err);
//     });
// };

// function dislikeItem(req, res) {
//   ClothingItem.findByIdAndUpdate(
//     req.params.itemId,
//     { $pull: { likes: req.user._id } },
//     { new: true }
//   )
//     .orFail()
//     .then(() =>
//       res.status(200).send({ message: "Item has succesfully been disliked" })
//     )
//     .catch((err) => {
//       findByIdItemError(req, res, err);
//     });
// }

// module.exports = {
//   createItem,
//   getItems,
//   updateItem,
//   deleteItem,
//   likeItem,
//   dislikeItem,
// };
