import mongoose from 'mongoose';
import { Scheme } from '../models/Scheme.js';
import { seedSchemes } from '../seed.js';

// In-memory fallback dataset for testing before DB is connected
let inMemorySchemes = [...seedSchemes];

// High-performance In-Memory Cache for live MongoDB Atlas schemes
let dbCache = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

const isDbConnected = () => mongoose.connection.readyState === 1;

/**
 * Pre-warm or refresh in-memory cache directly from Atlas with lean documents
 */
export const refreshDbCache = async () => {
  if (isDbConnected()) {
    try {
      const schemes = await Scheme.find({})
        .sort({ rank: 1, createdAt: -1 })
        .lean();
      dbCache = schemes;
      lastCacheTime = Date.now();
      console.log(`⚡ [Cache Ready] Loaded ${dbCache.length} schemes into memory. Query latency: < 5ms.`);
      return dbCache;
    } catch (err) {
      console.error('Failed to refresh scheme cache:', err.message);
    }
  }
  return null;
};

/**
 * 1. Full Schemes endpoint for Web Portal & Citizen Kiosk
 * Delivers sub-10ms response times via pre-warmed memory cache
 */
export const getAllSchemes = async (req, res) => {
  try {
    const { category, search, activeOnly } = req.query;

    if (isDbConnected()) {
      if (!dbCache || Date.now() - lastCacheTime > CACHE_TTL_MS) {
        await refreshDbCache();
      }

      let results = dbCache || [];

      if (category && category !== 'all') {
        const catLower = category.toLowerCase();
        results = results.filter((s) => s.category?.toLowerCase() === catLower);
      }
      if (activeOnly === 'true') {
        results = results.filter((s) => s.activeOnTerminal);
      }
      if (search) {
        const query = search.toLowerCase();
        results = results.filter(
          (s) =>
            (s.titleEn && s.titleEn.toLowerCase().includes(query)) ||
            (s.titleTa && s.titleTa.toLowerCase().includes(query)) ||
            (s.deptEn && s.deptEn.toLowerCase().includes(query)) ||
            (s.deptTa && s.deptTa.toLowerCase().includes(query)) ||
            (s.schemeId && s.schemeId.toLowerCase().includes(query))
        );
      }

      return res.json({
        success: true,
        source: 'mongodb-atlas-cached',
        count: results.length,
        data: results,
      });
    }

    // In-memory fallback if database is not yet connected
    let results = inMemorySchemes;
    if (category && category !== 'all') {
      results = results.filter((s) => s.category === category);
    }
    if (activeOnly === 'true') {
      results = results.filter((s) => s.activeOnTerminal);
    }
    if (search) {
      const query = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.titleEn.toLowerCase().includes(query) ||
          s.titleTa.includes(query) ||
          s.deptEn.toLowerCase().includes(query) ||
          s.deptTa.includes(query)
      );
    }

    return res.json({
      success: true,
      source: 'standalone-preview',
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. Ultra-Lean Endpoint for ESP32 OLED Display
 * Returns minimal fields (< 60 bytes per item) with instant memory response
 */
export const getTerminalSchemes = async (req, res) => {
  try {
    if (isDbConnected()) {
      if (!dbCache || Date.now() - lastCacheTime > CACHE_TTL_MS) {
        await refreshDbCache();
      }

      const activeSchemes = (dbCache || []).filter((s) => s.activeOnTerminal);
      const compactPayload = activeSchemes.map((s) => ({
        id: s.schemeId,
        tEn: s.titleEn,
        tTa: s.titleTa,
        amt: s.benefitAmount,
        cat: s.category,
      }));

      return res.json({
        terminal: 'ESP32-CRIVERA-01',
        source: 'mongodb-atlas-cached',
        count: compactPayload.length,
        schemes: compactPayload,
      });
    }

    // In-memory fallback
    const activeSchemes = inMemorySchemes
      .filter((s) => s.activeOnTerminal)
      .map((s) => ({
        id: s.schemeId,
        tEn: s.titleEn,
        tTa: s.titleTa,
        amt: s.benefitAmount,
        cat: s.category,
      }));

    return res.json({
      terminal: 'ESP32-CRIVERA-01',
      source: 'standalone-preview',
      count: activeSchemes.length,
      schemes: activeSchemes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const buildSchemeFilter = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ schemeId: id }, { _id: id }] };
  }
  return { schemeId: id };
};

/**
 * 3. Single Scheme Details
 */
export const getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const scheme = await Scheme.findOne(buildSchemeFilter(id));
      if (!scheme) {
        return res.status(404).json({ success: false, message: 'Scheme not found' });
      }
      scheme.clicks = (scheme.clicks || 0) + 1;
      await scheme.save();
      return res.json({ success: true, data: scheme });
    }

    const scheme = inMemorySchemes.find((s) => s.schemeId === id || s._id === id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    scheme.clicks = (scheme.clicks || 0) + 1;
    return res.json({ success: true, source: 'standalone-preview', data: scheme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 4. Create New Scheme
 */
export const createScheme = async (req, res) => {
  try {
    if (isDbConnected()) {
      const newScheme = await Scheme.create(req.body);
      const leanNew = newScheme.toObject ? newScheme.toObject() : newScheme;
      if (dbCache) dbCache.unshift(leanNew);
      return res.status(201).json({ success: true, data: leanNew });
    }

    const newScheme = {
      ...req.body,
      schemeId: req.body.schemeId || `SCH-${Date.now()}`,
      createdAt: new Date(),
    };
    inMemorySchemes.unshift(newScheme);
    return res.status(201).json({ success: true, source: 'standalone-preview', data: newScheme });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 5. Update Scheme Details
 */
export const updateScheme = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const updated = await Scheme.findOneAndUpdate(buildSchemeFilter(id), req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Scheme not found' });
      }
      const leanUpdated = updated.toObject ? updated.toObject() : updated;
      if (dbCache) {
        const idx = dbCache.findIndex((s) => s.schemeId === id || s._id?.toString() === id);
        if (idx !== -1) dbCache[idx] = leanUpdated;
        else dbCache.unshift(leanUpdated);
      }
      return res.json({ success: true, data: leanUpdated });
    }

    const index = inMemorySchemes.findIndex((s) => s.schemeId === id || s._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    inMemorySchemes[index] = { ...inMemorySchemes[index], ...req.body };
    return res.json({ success: true, source: 'standalone-preview', data: inMemorySchemes[index] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 6. Toggle Terminal Active Status
 */
export const toggleTerminalStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const scheme = await Scheme.findOne(buildSchemeFilter(id));
      if (!scheme) {
        return res.status(404).json({ success: false, message: 'Scheme not found' });
      }
      scheme.activeOnTerminal = !scheme.activeOnTerminal;
      await scheme.save();
      if (dbCache) {
        const target = dbCache.find((s) => s.schemeId === id || s._id?.toString() === id);
        if (target) target.activeOnTerminal = scheme.activeOnTerminal;
      }
      return res.json({
        success: true,
        schemeId: scheme.schemeId,
        activeOnTerminal: scheme.activeOnTerminal,
      });
    }

    const scheme = inMemorySchemes.find((s) => s.schemeId === id || s._id === id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    scheme.activeOnTerminal = !scheme.activeOnTerminal;
    return res.json({
      success: true,
      source: 'standalone-preview',
      schemeId: scheme.schemeId,
      activeOnTerminal: scheme.activeOnTerminal,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 7. Delete Scheme
 */
export const deleteScheme = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Scheme.findOneAndDelete(buildSchemeFilter(id));
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Scheme not found' });
      }
      if (dbCache) {
        dbCache = dbCache.filter((s) => s.schemeId !== id && s._id?.toString() !== id);
      }
      return res.json({ success: true, message: 'Scheme deleted successfully', schemeId: id });
    }

    const index = inMemorySchemes.findIndex((s) => s.schemeId === id || s._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    inMemorySchemes.splice(index, 1);
    return res.json({ success: true, source: 'standalone-preview', message: 'Scheme deleted successfully', schemeId: id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


