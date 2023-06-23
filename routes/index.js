const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItem");
const { ERROR_404 } = require("../utils/errors");

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

module.exports = router;

// const router = require("express").Router();
// const User = require("./users");
// const { ERROR_404 } = require("../utils/errors");

// const clothingItem = require("./clothingItem");

// router.use("/items", clothingItem);
// router.use("/users", User);

// router.use((req, res) => {
//   res.status(ERROR_404).send({
//     message:
//       "There is NO API with the requested path, or the request was sent to a non-existent address",
//   });
// });

// module.exports = router;
