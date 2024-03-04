const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addOrder = async (req, res) => {
  const order = new Order({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    drugs: req.body.drugs,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getOrder,
  addOrder,
};
