import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import schemeRoutes from './routes/schemeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { ensureDefaultAdmin } from './controllers/authController.js';
import { refreshDbCache } from './controllers/schemeController.js';

// Resolve .env path reliably
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envCandidate = path.resolve(__dirname, '../.env');
if (fs.existsSync(envCandidate)) {
  dotenv.config({ path: envCandidate });
} else {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow dashboard-ui, kiosk, and ESP32
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CRIVERA Civic Information & Hardware Gateway',
    database: process.env.MONGODB_URI ? 'configured' : 'standalone-preview',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);

// Database Connection & Server Launch
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI?.trim();
    if (mongoUri && mongoUri.startsWith('mongodb')) {
      await connectDB();
      // Ensure default system administrator is provisioned
      await ensureDefaultAdmin();
      // Pre-warm cache for instantaneous <5ms scheme delivery
      await refreshDbCache();
    } else {
      console.log('ℹ️  MONGODB_URI not provided yet in .env.');
      console.log('🚀 Running in Standalone Preview Mode with built-in verified schemes.');
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n===================================================`);
      console.log(`  CRIVERA Backend Gateway Active on Port ${PORT}`);
      console.log(`  - Health Check:   http://localhost:${PORT}/api/health`);
      console.log(`  - Auth API:       http://localhost:${PORT}/api/auth/login`);
      console.log(`  - All Schemes:    http://localhost:${PORT}/api/schemes`);
      console.log(`  - ESP32 OLED API: http://localhost:${PORT}/api/schemes/terminal`);
      console.log(`===================================================\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
