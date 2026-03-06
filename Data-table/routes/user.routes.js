const express = require("express");
const router = express.Router();
const Users = require("../models/user.models");

// views
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedate = await Users.findByIdAndUpdate(req.params.id,
      req.body,
      {new:true}
    );

    res.json(updatedate);
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
});

module.exports = router;
