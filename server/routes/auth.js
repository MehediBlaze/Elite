const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

// Registration
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all necessary fields' });
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    const accessToken = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    const parsed = savedUser.toObject();
    delete parsed.password;
    return res.json({ ...parsed, accessToken });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Signing In
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all necessary fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Wrong email address or password' });
    }
    const compare = bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(401).json({ message: 'Wrong email address or password' });
    }
    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const parsed = user.toObject();
    delete parsed.password;
    return res.json({ ...parsed, accessToken });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
