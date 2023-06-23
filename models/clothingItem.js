const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clothingItems", clothingItemSchema);

// const mongoose = require("mongoose");
// const validator = require("validator");

// const clothingItem = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: [2, "Name must be at least 2 characters long"],
//     maxlength: [30, "Name must not exceed 30 characters"],
//   },
//   weather: {
//     type: String,
//     required: true,
//     enum: ["hot", "warm", "cold"],
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//     validate: {
//       validator: (v) => validator.isURL(v),
//       message: "Enter a valid URL",
//     },
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: [true, "Owner is required"],
//   },
//   likes: {
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     default: [],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("clothingItem", clothingItem);
