const express = require("express");
const Puntuacion = require(`../models/Puntuaciones`)
const router = express.Router();
router.post("/getScore", async (req, res) => {
  // console.log(req.body)

await Puntuacion.create(req.body);
  let scores = await Puntuacion.find().sort((a, b) => b.score - a.score).limit(3);
  res.json({ scores });
});
module.exports = router
