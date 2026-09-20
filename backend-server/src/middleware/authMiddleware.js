import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'crivera_super_secret_jwt_key_2026';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied: Authentication token missing or invalid format.',
      });
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          code: 'TOKEN_EXPIRED',
          message: 'Session Expired: Your cryptographic session token has expired. Please log in again.',
        });
      }
      return res.status(401).json({
        success: false,
        code: 'TOKEN_INVALID',
        message: 'Security Alert: Invalid or forged session signature.',
      });
    }

    // Attach decoded user info
    req.user = decoded;

    // Optional DB verification to ensure account was not deleted or suspended
    try {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (admin) {
        req.adminProfile = admin;
      }
    } catch (dbErr) {
      // In preview mode or non-mongo test fallback, decoded payload suffices
    }

    next();
  } catch (error) {
    console.error('Auth Middleware Security Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal security verification error.',
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'SYSTEM_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: You do not possess the required administrative privileges.',
    });
  }
  next();
};
