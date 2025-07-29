const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(helmet());
app.use(cors({ origin: CLIENT_URL.split(','), credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(cookieParser());

// In-memory storage for demo purposes
const users = [];

// Middleware to verify JWT
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Register endpoint
app.post(
  '/api/auth/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid data' });
    const { email, password } = req.body;
    try {
      const existing = users.find((u) => u.email === email);
      if (existing) return res.status(400).json({ message: 'User already exists' });
      const hash = await bcrypt.hash(password, 8);
      const newUser = { id: users.length + 1, email, password: hash, name: 'User ' + (users.length + 1) };
      users.push(newUser);
      return res.json({ message: 'Registered successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Registration failed' });
    }
  }
);

// Login endpoint
app.post(
  '/api/auth/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid data' });
    const { email, password } = req.body;
    try {
      const user = users.find((u) => u.email === email);
      if (!user) return res.status(400).json({ message: 'User not found' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Login failed' });
    }
  }
);

// Get user profile
app.get('/api/user/profile', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ id: user.id, email: user.email, name: user.name, verified: false });
});

// Markets endpoint (mock top 4 pairs)
app.get('/api/markets', async (req, res) => {
  const pairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT'];
  try {
    const results = await Promise.all(
      pairs.map(async (symbol) => {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        const data = await response.json();
        return {
          symbol,
          price: parseFloat(data.lastPrice),
          change: parseFloat(data.priceChangePercent)
        };
      })
    );
    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch markets' });
  }
});

// Orderbook endpoint (mock data)
app.get('/api/orderbook/:symbol', (req, res) => {
  const { symbol } = req.params;
  const bids = Array.from({ length: 10 }).map(() => ({ price: Math.random() * 1000 + 1000, amount: Math.random() * 5 }));
  const asks = Array.from({ length: 10 }).map(() => ({ price: Math.random() * 1000 + 1000, amount: Math.random() * 5 }));
  return res.json({ symbol, bids, asks });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));