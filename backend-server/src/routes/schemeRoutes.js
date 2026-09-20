import express from 'express';
import {
  getAllSchemes,
  getTerminalSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
  toggleTerminalStatus,
} from '../controllers/schemeController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. ESP32 Hardware Endpoint (Ultra-lean for OLED - Public)
router.get('/terminal', getTerminalSchemes);

// 2. Web Portal & Kiosk Endpoints (Public)
router.get('/cache/refresh', async (req, res) => {
  const { refreshDbCache } = await import('../controllers/schemeController.js');
  await refreshDbCache();
  res.json({ success: true, message: 'In-memory scheme cache refreshed successfully' });
});
router.get('/', getAllSchemes);
router.get('/:id', getSchemeById);

// 3. Admin Management Endpoints (Cryptographically Protected by JWT)
router.post('/', verifyToken, createScheme);
router.put('/:id', verifyToken, updateScheme);
router.delete('/:id', verifyToken, deleteScheme);
router.patch('/:id/toggle-terminal', verifyToken, toggleTerminalStatus);

export default router;
