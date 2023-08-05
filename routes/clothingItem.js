const router = require("express").Router();
const { authorization } = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  updateItem,
  disLikeItem,
} = require("../controllers/clothingItem");

const {
  validateCreatedItem,
  validateID,
} = require("../middlewares/validation");

router.post("/", authorization, validateCreatedItem, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", authorization, validateID, likeItem);
router.put("/:itemId", authorization, validateID, updateItem);

router.delete("/:itemId", authorization, validateID, deleteItem);
router.delete("/:itemId/likes", authorization, validateID, disLikeItem);

module.exports = router;
