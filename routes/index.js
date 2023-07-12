const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { errors } = require("../utils/errors");
const { loginUser, createUser } = require("../controllers/users");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/signin", loginUser);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).send({
    message: "Router not found",
  });
});

module.exports = router;