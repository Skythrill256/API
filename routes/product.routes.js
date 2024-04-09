const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure Multer
const Product = require('../models/product.model');

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, quantity, description, productLocation } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new Product({
      name,
      quantity,
      description,
      productLocation,
      image: result.secure_url
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, quantity, description, productLocation } = req.body;

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, quantity, description, productLocation },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

