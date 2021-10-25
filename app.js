const express = require("express");
const path = require("path");
const cors = require("cors")
require("dotenv").config();
const app = express();
const mongoose = require(`mongoose`);
const Puntuacion = require(`./models/Puntuaciones`);
const game = require("./api/game");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ly1xx.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`
  )
  .then(function () {
    console.log("Estamos conectados");
  })
  .catch((error) => {
    console.log(`Ha ocurrido el siguiente error:${error}`);
  });
app.use(cors())

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use("/api/game", game);


app.listen(process.env.PORT, () => {
  console.log("Server listening on server 5000");
});
