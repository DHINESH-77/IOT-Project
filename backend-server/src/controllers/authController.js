import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'crivera_super_secret_jwt_key_2026';

// Helper to seed default administrator if none exists
export const ensureDefaultAdmin = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const existing = await Admin.findOne({ email: 'admin@crivera.gov.in' });
    if (!existing) {
      const defaultAdmin = new Admin({
        email: 'admin@crivera.gov.in',
        password: 'admin123',
        name: 'Panchayat Officer',
        role: 'SYSTEM_ADMIN',
        nodeId: 'ESP32_NODE_01',
      });
      await defaultAdmin.save();
      console.log('✅ Default System Administrator provisioned in MongoDB: admin@crivera.gov.in');
    }
  } catch (error) {
    console.warn('⚠️ Could not check/seed default admin in DB:', error.message);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin credentials & issue signed JWT
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both official email and password are required.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. If MongoDB is connected, authenticate against Database with bcrypt
    if (mongoose.connection.readyState === 1) {
      let admin = await Admin.findOne({ email: cleanEmail }).select('+password');

      // Auto-provision default admin if DB empty
      if (!admin && cleanEmail === 'admin@crivera.gov.in') {
        try {
          admin = new Admin({
            email: 'admin@crivera.gov.in',
            password: 'Admin@Crivera2026!',
            name: 'Panchayat Officer',
            role: 'SYSTEM_ADMIN',
            nodeId: 'ESP32_NODE_01',
          });
          await admin.save();
          admin = await Admin.findOne({ email: cleanEmail }).select('+password');
        } catch (err) {
          console.error('Failed to auto-provision default admin:', err);
        }
      }

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed: Invalid administrator credentials.',
        });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed: Invalid administrator credentials.',
        });
      }

      admin.lastLogin = new Date();
      await admin.save();

      const token = jwt.sign(
        {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          nodeId: admin.nodeId,
        },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({
        success: true,
        message: 'Admin authorization granted.',
        token,
        user: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          nodeId: admin.nodeId,
          lastLogin: admin.lastLogin,
        },
      });
    }

    // 2. Fallback for offline/standalone mode
    if (cleanEmail === 'admin@crivera.gov.in' && (password === 'admin123' || password === 'Admin@Crivera2026!')) {
      const token = jwt.sign(
        {
          id: 'standalone_admin_01',
          email: 'admin@crivera.gov.in',
          name: 'Panchayat Officer',
          role: 'SYSTEM_ADMIN',
          nodeId: 'ESP32_NODE_01',
        },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({
        success: true,
        message: 'Admin authorization granted (standalone mode).',
        token,
        user: {
          id: 'standalone_admin_01',
          email: 'admin@crivera.gov.in',
          name: 'Panchayat Officer',
          role: 'SYSTEM_ADMIN',
          nodeId: 'ESP32_NODE_01',
          lastLogin: new Date(),
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed: Invalid administrator credentials.',
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server security error during authentication.',
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Verify cryptographic token and return active profile
 * @access  Private (Bearer token)
 */
export const getMe = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1 && req.user.id !== 'standalone_admin_01') {
      const admin = await Admin.findById(req.user.id).select('-password');
      if (admin) {
        return res.json({
          success: true,
          user: {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            nodeId: admin.nodeId,
            lastLogin: admin.lastLogin,
          },
        });
      }
    }

    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error('getMe Verification Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify session profile.',
    });
  }
};
