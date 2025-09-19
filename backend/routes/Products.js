const express = require('express');
const router = express.Router();
const { Products } = require('../models');

// GET all products
router.get('/', async (req, res) => {
  const productList = await Products.findAll();
  res.json(productList);
});

// CREATE new product
router.post('/', async (req, res) => {
  const product = req.body;
  const newProduct = await Products.create(product);
  res.json(newProduct);
});

// UPDATE product by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  await Products.update(
    { name, price, stock },
    { where: { id } }
  );

  res.json({ message: "Product updated successfully" });
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Products.destroy({ where: { id } });
  res.json({ message: "Product deleted successfully" });
});

module.exports = router;
