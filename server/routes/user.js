const verifyPermission = require('../middlewares/verifyPermission');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = require('express').Router();
const saltRounds = 10;

router.put('/:id', verifyToken, verifyPermission, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const parsed = updatedUser.toObject();
    delete parsed.password;
    return res.json(parsed);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', verifyToken, verifyPermission, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/single/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find({}, { password: 0 }).sort({ _id: -1 }).limit(5)
      : await User.find({}, { password: 0 });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
