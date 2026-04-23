const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/auth");

const router = express.Router();

// ADD ITEM
router.post("/", auth, async (req, res) => {
  const item = new Item({ ...req.body, user: req.user.id });
  await item.save();
  res.json(item);
});

// GET ALL
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// SEARCH
router.get("/search", async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.query.name, $options: "i" }
  });
  res.json(items);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;