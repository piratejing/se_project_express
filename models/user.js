const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);

// const mongoose = require("mongoose");
// const validator = require("validator");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Field required"],
//     minlength: [2, "Name must be at least 2 characters long"],
//     maxlength: [30, "Name must not exceed 30 characters"],
//   },
//   avatar: {
//     type: String,
//     required: [true, "Field Required"],
//     validate: {
//       validator: (value) => validator.isURL(value),
//       message: "Enter a valid URL",
//     },
//   },
// });

// module.exports = mongoose.model("user", userSchema);
