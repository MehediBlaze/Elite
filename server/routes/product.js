const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const Product = require('../models/Product');

const router = require('express').Router();

// Create
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    return res.json(savedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedProduct);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Fetch
router.get('/single/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Fetch All
router.get('/all', async (req, res) => {
  const queryNew = req.query.new;
  const queryCat = req.query.cat;

  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCat) {
      products = await Product.find({ categories: { $in: [queryCat] } });
    } else {
      products = await Product.find();
    }
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
