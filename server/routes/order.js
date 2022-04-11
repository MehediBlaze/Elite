const verifyPermission = require('../middlewares/verifyPermission');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const Order = require('../models/Order');

const router = require('express').Router();

// Create
router.post('/', async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    return res.json(savedOrder);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedOrder);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Fetch
router.get('/single/:userId', verifyToken, verifyPermission, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Fetch All
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = Order.find();
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Monthly Income
router.get('/income', verifyToken, verifyAdmin, async (req, res) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 2));

  try {
    const income = await Order.aggregate([
      { $match: { $gte: previousMonth } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    return res.json(income);
  } catch (err) {}
});

module.exports = router;
