const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;

// const router = require("express").Router();

// const { getUser, getUsers, createUser } = require("../controllers/users");

// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:userId", getUser);

// module.exports = router;
