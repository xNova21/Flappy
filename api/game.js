const express = require("express");
const Puntuacion = require(`../models/Puntuaciones`)
const router = express.Router();
router.post("/getScore", async (req, res) => {

await Puntuacion.create(req.body);
  let scores = await Puntuacion.find().sort({score: -1}).limit(3)
  console.log(scores)
  // scores.sort((a, b) => b.score - a.score);
  res.json({ scores });
});
module.exports = router
