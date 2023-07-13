const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { authorization } = require("../middlewares/auth");

router.use(authorization);

router.get("/me", getCurrentUser);

router.patch("/me", updateUser);


module.exports = router;