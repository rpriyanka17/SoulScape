const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

router.post("/recommend", async (req, res) => {
  try {
    const { location, vibe } = req.body;

    const places = await Place.find({
      location: { $regex: location, $options: "i" },
      tags: { $in: vibe }   // vibe = array
    });

    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
