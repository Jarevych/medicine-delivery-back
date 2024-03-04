const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: Number,
  drugs: [{
    id: Number,
    name: String,
    price: Number,
  }],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
