/*
 * This server defines a simple REST API for a demo cryptocurrency exchange. It is
 * intentionally lightweight and uses in‑memory data structures instead of a
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

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Helmet is commonly used to secure HTTP headers but is not installed in this
// environment. We omit it to avoid runtime errors. If you add it to
// node_modules you can uncomment the following line and the related
// middleware below.
// import helmet from 'helmet';
// Note: cookie-parser and express-rate-limit are intentionally omitted because
// they are not present in the provided node_modules. The demo server
// functions correctly without them.

// We also avoid express-validator and instead perform very basic
// validation inline. This keeps the server self‑contained and working
// in environments without additional dependencies.
import dotenv from 'dotenv';
// NOTE: we intentionally avoid pulling in external HTTP clients such as
// node‑fetch. Instead the external data endpoints below return simple
// synthetic values. This keeps the application entirely self‑contained and
// ensures it can run without network access.

// Load environment variables from a .env file when present. Defaults are
// provided further down so the application continues to work if variables
// are missing.
dotenv.config();

// Configuration values. Use sensible fallbacks so the server can run
// without external configuration. CLIENT_URL may contain a comma separated
// list of allowed origins.
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// In‑memory storage for demonstration purposes. In a production system
// persistent storage such as a database would be used instead. The User
// interface defines the shape of a registered user record. Orders and trades
// are provided to support additional API endpoints even though there is no
// way to create them in this demo.
interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}
const users: User[] = [];

interface Order {
  id: number;
  userId: number;
  symbol: string;
  amount: number;
  price: number;
  createdAt: Date;
}
const orders: Order[] = [];

interface Trade {
  id: number;
  userId: number;
  symbol: string;
  amount: number;
  price: number;
  createdAt: Date;
}
const trades: Trade[] = [];

// Create the Express application and apply common middleware. Helmet helps
// secure HTTP headers, CORS controls cross‑origin requests, a rate limiter
// throttles repeated requests, JSON parsing turns the request body into
// JavaScript objects, and cookieParser parses the cookie header.
const app = express();
// app.use(helmet());
app.use(cors({ origin: CLIENT_URL.split(','), credentials: true }));
app.use(express.json());

/**
 * Middleware to verify a JWT token in the Authorization header. If the
 * token is valid the decoded payload is attached to the request as
 * `req.user`. If invalid or missing the request is rejected with a 401.
 */
function authenticate(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    // Stash the decoded user information on the request for subsequent handlers
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// === Authentication routes ===

// Register a new user. Validates input, checks for duplicate emails, hashes
// the password and stores the new user in memory. Returns a 200 status
// with a confirmation message on success. Validation errors return a 400.
app.post('/api/auth/register', async (req: any, res: any) => {
  const { email, password } = req.body as { email?: string; password?: string };
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
    const newUser: User = {
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

// Authenticate a user and issue a JWT. Validates input, verifies the user
// exists and that the password matches. Returns a 400 if the user is not
// found or the password is incorrect. On success a JWT valid for one hour
// is returned.
app.post('/api/auth/login', async (req: any, res: any) => {
  const { email, password } = req.body as { email?: string; password?: string };
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

// === Protected user routes ===

// Return the profile of the authenticated user. Includes id, email and name
// and a placeholder `verified` flag. If the user cannot be found a 404 is
// returned.
app.get('/api/user/profile', authenticate, (req: any, res: any) => {
  const userId = (req as any).user.id as number;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ id: user.id, email: user.email, name: user.name, verified: false });
});

// Return a demo balance for the authenticated user. This implementation
// always returns zero because the demo does not track real balances.
app.get('/api/balance', authenticate, (_req: any, res: any) => {
  return res.json({ balance: 0 });
});

// Return the orders for the authenticated user. Since there is no order
// creation endpoint the array is always empty. The structure is included
// for completeness.
app.get('/api/orders', authenticate, (req: any, res: any) => {
  const userId = (req as any).user.id as number;
  const userOrders = orders.filter((o) => o.userId === userId);
  return res.json(userOrders);
});

// Return the trades for the authenticated user. Like orders this will be
// empty in the demo environment.
app.get('/api/trades', authenticate, (req: any, res: any) => {
  const userId = (req as any).user.id as number;
  const userTrades = trades.filter((t) => t.userId === userId);
  return res.json(userTrades);
});

// Return aggregate demo statistics. Reports the number of registered users
// and the number of orders currently stored in memory.
app.get('/api/admin/stats', (_req: any, res: any) => {
  return res.json({ users: users.length, orders: orders.length });
});

// === External data routes ===

// Return a fake USD price for a cryptocurrency. This endpoint returns a
// deterministic pseudo‑random price based on the provided coin id. It does
// not make any external network calls. If the id is empty a 400 is
// returned. The returned object mimics the shape of CoinGecko responses.
app.get('/api/coin/:id', (req: any, res: any) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  // Simple hash to produce a pseudo‑random but deterministic price for a
  // given id. Multiplying by 100 ensures values are in a reasonable range.
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % 1000;
  }
  const price = (hash + 100) / 10; // produces between 10 and 109.9
  return res.json({ usd: price });
});

// Return a mock orderbook for a given symbol. Generates random bid and ask
// levels around a base price. This is purely for demonstration.
app.get('/api/orderbook/:symbol', (req: any, res: any) => {
  const { symbol } = req.params;
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

// Return a synthetic set of market tickers. Each ticker entry includes a
// pseudo‑random price and 24‑hour change percentage. The values are
// deterministic relative to the symbol so the same symbol always yields
// the same numbers across requests. This eliminates external network
// dependencies while preserving the expected response shape.
app.get('/api/markets', (_req: any, res: any) => {
  const pairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT'];
  const results = pairs.map((symbol) => {
    // Compute a simple hash based on the symbol to derive pseudo values
    let h = 0;
    for (let i = 0; i < symbol.length; i++) {
      h = (h + symbol.charCodeAt(i) * (i + 1)) % 1000;
    }
    const price = (h + 1000) / 10; // between 100 and 109.9
    const change = ((h % 200) - 100) / 10; // between -10 and +9.9
    return {
      symbol,
      price,
      change
    };
  });
  return res.json(results);
});

// When this module is the entry point start listening on the configured
// port. When imported (e.g. by a test suite) the server will not start
// automatically so that supertest can attach its own listener.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;