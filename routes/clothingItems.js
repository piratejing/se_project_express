const router = require("express").Router();

const { 
  getItems,
  updateItems,
  createItem,
  deleteItems,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItems");


router.get("/", getItems);

router.post("/", createItem);



router.put("/:itemId", updateItems);
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItems);
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;