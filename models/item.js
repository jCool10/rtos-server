/*
    Code    : Sensor data visualization (Backend)
    Author  : Atick Faisal
    License : MIT
    Date    : 19.07.2019
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// the scheme of the item to be saved in database
const itemSchema = new Schema(
  {
    temp: {
      type: String,
      required: true,
    },
    hum: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    rain: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = Item = mongoose.model("item", itemSchema);
module.exports = mongoose.model("item", itemSchema);
