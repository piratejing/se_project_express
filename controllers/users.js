// const User = require("../models/user");
// const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { errors } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const combinedItemError = (req, res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(errors.BAD_REQUEST).send({
      message: "Invalid data passed for creating or updating a user.",
    });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(errors.NOT_FOUND).send({
      message: "User ID not found.",
    });
  }
  return res.status(errors.SERVER_ERROR).send({ message: "An error has occurred" });
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
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((previousUser) => {
      if (previousUser) {
        const error = new Error("Email already exists");
        error.status = errors.DUPLICATE;
        return Promise.reject(error);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res.send({
        data: { name: user.name, avatar: user.avatar, email: user.email },
      });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).send({ message: error.message });
      } else {
        combinedItemError(req, res, error);
      }
    });
};


// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   User.findOne({ email })
//     .then((previousUser) => {
//       if (previousUser) {
//         return Promise.reject({ status: errors.DUPLICATE, message: "Email already exists" });
//       }
//       return bcrypt.hash(password, 10);
//     })
//     .then((hash) => User.create({ name, avatar, email, password: hash }))
//     .then((user) => {
//       res.send({
//         data: { name: user.name, avatar: user.avatar, email: user.email },
//       });
//     })
//     .catch((error) => {
//       if (error.status) {
//         res.status(error.status).send({ message: error.message });
//       } else {
//         combinedItemError(req, res, error);
//       }
//     });
// };


// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   User.findOne({ email })
//     .then((previousUser) => {
//       if (previousUser) {
//         return res
//           .status(errors.DUPLICATE)
//           .send({ message: "Email already exist" });
//       }
//       return bcrypt.hash(password, 10);
//     })
//     .then((hash) => User.create({ name, avatar, email, password: hash }))
//     .then((user) => {
//       res.send({
//         data: { name: user.name, avatar: user.avatar, email: user.email },
//       });
//     })
//     .catch((e) => {
//       combinedItemError(req, res, e);
//     });
// };

const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() =>
      res.status(errors.UNAUTHORIZED).send({ message: "User not authorized" })
    );
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((e) => combinedItemError(req, res, e));
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const update = { name, avatar };

  User.findOneAndUpdate({ _id: req.user._id }, update, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(errors.NOT_FOUND).send({ message: "User not found" });
      }
      return res.send({
        data: { user, message: "Username updated successfully" },
      });
    })
    .catch((e) => {
      combinedItemError(req, res, e);
    });
};

module.exports = {
  getUser,
  getUserId,
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
};