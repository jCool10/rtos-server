/*
    Code    : Sensor data visualization (Backend)
    Author  : Atick Faisal
    License : MIT
    Date    : 19.07.2019
*/

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Item = require("./models/item");
const path = require("path");
// const mongoURI = require("./config/key").admin;

const mongoURI =
  "mongodb+srv://rtos:rtos@rtos.dt3zhlp.mongodb.net/?retryWrites=true&w=majority&appName=RTOS";

// connect to the database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const app = express();

// use body-parser middleware
app.use(bodyParser.json());

// handle get reuests
// sends the last 7 values
// react app sensds this get request
app.get("/api/sensors", function (req, res) {
  Item.find()
    .then((items) => res.json(items.slice(items.length - 6, items.length)))
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// handle post requests
app.post("/api/sensors", function (req, res) {
  // create new item using the schema
  // const newItem = new Item({
  //   temp: req.body.temp,
  //   hum: req.body.hum,
  //   light: req.body.light,
  // });
  // save value to database
  // newItem.save().then((item) => res.json(item));
  console.log(req.body);

  res.json(req.body);
});

// start the server @localhost:5000
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
