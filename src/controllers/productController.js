const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const { page, pageSize } = req.pagination;

    const products = await Product.find();

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      totalPages: Math.ceil(products.length / pageSize),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Помилка при отриманні товарів" });
    console.error('Error:', error);
console.error('Stack:', error.stack);
  }
};

const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.warn("Contact not found");
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Помилка при отриманні товарів" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { photo } = req.body;
    const prodUrl = await Product.findOne({ photo });
    if (prodUrl) {
      console.log("this product exists");
      return res.status(500).json({ error: "Помилка при отриманні товарів" });
    }
    const newProduct = await Product.create({ ...req.body });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Помилка при отриманні товарів" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.log(id, "Невірний ідентифікатор товару");
      return res.status(400).json({ error: "Невірний ідентифікатор товару" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) {
      console.log("Product not found");
      return res.status(404).json({ error: "Товар не знайдено" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Помилка при отриманні товарів" });
  }
};

const delProducts = async (req, res) => {
  try {
    //   const { id } = req.params;
    //   if(!id) {
    //     console.log(id, "Невірний ідентифікатор товару");
    //     return res.status(400).json({ error: "Невірний ідентифікатор товару" });
    // }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      console.warn("Product not found");
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Помилка при видаленні товару" });
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  delProducts,
  addProduct,
  updateProduct,
};
