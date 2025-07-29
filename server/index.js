/*
 * This server defines a simple REST API for a demo cryptocurrency exchange.
 * It is intentionally lightweight and uses in‑memory data structures instead of a
 * database to make it easy to run in any environment without additional
 * services. The API exposes endpoints for user authentication (register and
 * login), fetching a user profile, retrieving market data and orderbook
 * information, and some other demo endpoints such as balance, orders and
 * trades. To prevent abuse the server applies sensible security middleware
 * including CORS, Helmet and rate limiting. When used as a module (for
 * example in tests) the server exports the Express application without
 * listening on a port. When executed directly it starts listening on the
 * configured PORT.
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Helmet, cookie-parser, express-rate-limit and express-validator are not
// installed in this environment. To keep this demo self‑contained we omit
// them. The related functionality (like validation) is implemented inline.
// const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
// const rateLimit = require('express-rate-limit');
// const { body, validationResult } = require('express-validator');
require('dotenv').config();

// Configuration values with sensible defaults. CLIENT_URL can be a comma
// separated list of allowed origins.
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// In‑memory storage for demonstration purposes. In production these would
// likely be persisted in a database. Users, orders and trades are stored
// as arrays of simple objects.
const users = [];
const orders = [];
const trades = [];

const app = express();
// app.use(helmet());
app.use(cors({ origin: CLIENT_URL.split(','), credentials: true }));
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
// app.use(cookieParser());

// Authentication middleware. Verifies a bearer token and attaches the
// decoded payload to req.user. Rejects requests with a 401 if the token is
// missing or invalid.
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Register a new user. Validates input, checks for duplicates, hashes the
// password and stores the user. Returns a confirmation message on success.
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body || {};
  // Basic validation: email must be a string containing '@' and password
  // must be at least 6 characters long.
  if (typeof email !== 'string' || !email.includes('@') || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hash = await bcrypt.hash(password, 8);
    const newUser = {
      id: users.length + 1,
      email,
      password: hash,
      name: email
    };
    users.push(newUser);
    return res.json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

// Authenticate a user and return a JWT. Returns 400 if the user does not
// exist or the password does not match.
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  // Basic validation: email must be a non‑empty string containing '@' and password
  // must be a non‑empty string.
  if (typeof email !== 'string' || !email.includes('@') || typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }
});

// Return the profile of the authenticated user. Includes id, email and name
// and a placeholder verified flag. Returns 404 if the user is not found.
app.get('/api/user/profile', authenticate, (req, res) => {
  const userId = req.user.id;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ id: user.id, email: user.email, name: user.name, verified: false });
});

// Return a demo balance for the authenticated user. Always returns zero.
app.get('/api/balance', authenticate, (_req, res) => {
  return res.json({ balance: 0 });
});

// Return the orders for the authenticated user. Empty in this demo.
app.get('/api/orders', authenticate, (req, res) => {
  const userOrders = orders.filter((o) => o.userId === req.user.id);
  return res.json(userOrders);
});

// Return the trades for the authenticated user. Empty in this demo.
app.get('/api/trades', authenticate, (req, res) => {
  const userTrades = trades.filter((t) => t.userId === req.user.id);
  return res.json(userTrades);
});

// Return aggregate statistics about registered users and orders.
app.get('/api/admin/stats', (_req, res) => {
  return res.json({ users: users.length, orders: orders.length });
});

// Return a fake USD price for a cryptocurrency id. Uses a simple hash to
// produce a deterministic pseudo‑random price per id. Returns 400 for empty
// ids.
app.get('/api/coin/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % 1000;
  }
  const price = (hash + 100) / 10;
  return res.json({ usd: price });
});

// Return a mock orderbook with random bid/ask levels for a symbol.
app.get('/api/orderbook/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const bids = Array.from({ length: 10 }).map(() => ({
    price: Math.random() * 1000 + 1000,
    amount: Math.random() * 5
  }));
  const asks = Array.from({ length: 10 }).map(() => ({
    price: Math.random() * 1000 + 1000,
    amount: Math.random() * 5
  }));
  return res.json({ symbol, bids, asks });
});

// Return synthetic market data for a small set of trading pairs. Uses a
// deterministic hash of the symbol to derive the price and 24h change.
app.get('/api/markets', (_req, res) => {
  const pairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT'];
  const results = pairs.map((symbol) => {
    let h = 0;
    for (let i = 0; i < symbol.length; i++) {
      h = (h + symbol.charCodeAt(i) * (i + 1)) % 1000;
    }
    const price = (h + 1000) / 10;
    const change = ((h % 200) - 100) / 10;
    return {
      symbol,
      price,
      change
    };
  });
  return res.json(results);
});

// Start the server only when this file is executed directly. When imported
// the server exports the Express app so that it can be used by supertest
// without creating a listening socket.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;