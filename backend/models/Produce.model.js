const mongoose = require("mongoose");

const ProduceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  imgs: {
    type: [String] 
  }
});

const Produce = mongoose.model("Produce", ProduceSchema);

module.exports = { Produce };
