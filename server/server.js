require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const razorRouter = require('./routes/razor');
const cors = require('cors');

// App Configure
const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'http://elite-shop-frontend.netlify.app/'] }));

// Home Route
app.get('/', (req, res) => {
  res.json({ message: 'Success' });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/checkout', razorRouter);

// Mongo Connect
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) console.error(err.message);
  else console.log('Mongo Connected');
});

// Server Connect
app.listen(process.env.PORT || 5000, () => {
  console.log('Server Connected');
});
