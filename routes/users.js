const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { authorization } = require("../middlewares/auth");

router.use(authorization);

router.get("/me", getCurrentUser);

router.patch("/me", updateUser);

// router.get("/", getUser);

// router.get("/:userId", getUserId);

// router.post("/", createUser);

module.exports = router;