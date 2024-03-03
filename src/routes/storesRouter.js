const express = require("express");
const router = express.Router();
const {getAllProducts} = require("../controllers/storesController");

router.get('/store', getAllProducts);

module.exports = router;
