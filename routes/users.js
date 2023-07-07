const router = require("express").Router();
const { getUser, getUserId, createUser } = require("../controllers/users");

router.get("/", getUser);

router.get("/:userId", getUserId);

router.post("/", createUser);

module.exports = router;