const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");

const { ERROR_404 } = require("../utils/errors");

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Resource request not found" });
});

module.exports = router;
