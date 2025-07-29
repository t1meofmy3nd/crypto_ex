import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import expressValidator from 'express-validator';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const { body, validationResult } = expressValidator;

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(helmet());
app.use(cors({ origin: CLIENT_URL.split(','), credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(cookieParser());

function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.post(
  '/api/auth/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid data' });
    const { email, password } = req.body;
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(400).json({ message: 'User already exists' });
      const hash = await bcrypt.hash(password, 8);
      await prisma.user.create({ data: { email, password: hash, name: email } });
      return res.json({ message: 'Registered successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Registration failed' });
    }
  }
);

app.post(
  '/api/auth/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid data' });
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
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

app.get('/api/user/profile', authenticate, async (req, res) => {
  const userId = (req as any).user.id;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, name: true, balance: true } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
});

app.get('/api/balance', authenticate, async (req, res) => {
  const userId = (req as any).user.id;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { balance: true } });
  return res.json({ balance: user?.balance || 0 });
});

app.get('/api/orders', authenticate, async (req, res) => {
  const userId = (req as any).user.id;
  const orders = await prisma.order.findMany({ where: { userId } });
  return res.json(orders);
});

app.get('/api/trades', authenticate, async (req, res) => {
  const userId = (req as any).user.id;
  const trades = await prisma.trade.findMany({ where: { userId } });
  return res.json(trades);
});

app.get('/api/admin/stats', async (_req, res) => {
  const userCount = await prisma.user.count();
  const orderCount = await prisma.order.count();
  return res.json({ users: userCount, orders: orderCount });
});

app.get('/api/coin/:id', async (req, res) => {
  try {
    const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${req.params.id}&vs_currencies=usd`);
    const data = (await r.json()) as Record<string, { usd: number }>;
    return res.json(data[req.params.id]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to fetch price' });
  }
});

// Mock orderbook
app.get('/api/orderbook/:symbol', (req, res) => {
  const { symbol } = req.params;
  const bids = Array.from({ length: 10 }).map(() => ({ price: Math.random() * 1000 + 1000, amount: Math.random() * 5 }));
  const asks = Array.from({ length: 10 }).map(() => ({ price: Math.random() * 1000 + 1000, amount: Math.random() * 5 }));
  return res.json({ symbol, bids, asks });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;