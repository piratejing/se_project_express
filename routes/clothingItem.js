const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);
router.post("/", createItem);
router.put("/:itemsId/likes", likeItem);
router.delete("/:itemsId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;

// const router = require("express").Router();

// const {
//   getItems,
//   createItem,
//   deleteItem,
//   likeItem,
//   updateItem,
//   dislikeItem,
// } = require("../controllers/clothingItem");

// router.post("/", createItem);
// router.get("/", getItems);
// router.put("/:itemId/likes", likeItem);
// router.put("/:itemId", updateItem);
// router.delete("/:itemId", deleteItem);
// router.delete("/:itemId/likes", dislikeItem);

// module.exports = router;
