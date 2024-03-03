const Pharmacy = require("../models/pharmacyModel");
const ctrlWrapper = require('../services/ctrlWrapper')
const getAllProducts = async (req, res) => {
  try {
    const stores = await Pharmacy.find();
    console.log(stores)
    if (stores.length === 0) {
      console.warn("products not found");
    }
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: "Помилка при отриманні товарів" });
    console.error("Error:", error);
    console.error("Stack:", error.stack);
  }
};


module.exports = {
    getAllProducts: ctrlWrapper(getAllProducts),
};



