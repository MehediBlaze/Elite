const verifyPermission = require('../middlewares/verifyPermission');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const Cart = require('../models/Cart');

const router = require('express').Router();

// Create
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    return res.json(savedCart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', verifyToken, verifyPermission, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedCart);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', verifyToken, verifyPermission, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Fetch
router.get('/single/:userId', verifyToken, verifyPermission, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Fetch All
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  const queryNew = req.query.new;
  const queryCat = req.query.cat;

  try {
    const carts = Cart.find();
    return res.json(carts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
