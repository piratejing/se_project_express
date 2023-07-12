const router = require("express").Router();

const { 
  getItems,
  createItem,
  deleteItems,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItems");

const { authorization } = require("../middlewares/auth");


router.get("/", getItems);

router.use(authorization);

router.post("/", createItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItems);
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;