const express = require("express");
const router = express.Router();
const { getOrder, addOrder } = require("../controllers/orderController");

router.get("/orders", getOrder);

router.post("/orders", addOrder);

module.exports = router;
