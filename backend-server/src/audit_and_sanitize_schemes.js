import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Scheme } from './models/Scheme.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function cleanArray(arr) {
  if (!Array.isArray(arr)) return [];
  const cleaned = [];

  for (let item of arr) {
    if (!item) continue;
    let s = decodeHtmlEntities(String(item).trim());
    if (!s) continue;

    // Merge fragments caused by comma splitting
    if (
      s.startsWith('issued ') ||
      s.startsWith('per annum') ||
      s.startsWith('aid from') ||
      s.startsWith('and eligible') ||
      s.startsWith('aid.') ||
      s.startsWith('or work') ||
      s.length < 15
    ) {
      if (cleaned.length > 0) {
        cleaned[cleaned.length - 1] = cleaned[cleaned.length - 1] + ' ' + s;
        continue;
      }
    }

    cleaned.push(s);
  }
  return cleaned;
}

function inferDepartment(scheme) {
  const t = (scheme.titleEn || '').toLowerCase();
  const c = (scheme.category || '').toLowerCase();

  if (scheme.scope === 'Tamil Nadu') {
    if (c === 'welfare') return 'Social Welfare and Women Empowerment Department, Govt of Tamil Nadu';
    if (c === 'agriculture') return 'Department of Agriculture and Farmers Welfare, Govt of Tamil Nadu';
    if (c === 'health') return 'Health and Family Welfare Department, Govt of Tamil Nadu';
    if (c === 'education') return 'Higher Education Department, Govt of Tamil Nadu';
    if (c === 'housing') return 'Rural Development and Panchayat Raj Department, Govt of Tamil Nadu';
    return 'Government of Tamil Nadu Welfare Administration';
  }

  // Central schemes
  if (t.includes('scholarship') || t.includes('education') || t.includes('fellowship') || c === 'education') {
    return 'Ministry of Education / UGC, Government of India';
  }
  if (t.includes('farmer') || t.includes('kisan') || t.includes('agriculture') || t.includes('crop') || c === 'agriculture') {
    return 'Ministry of Agriculture and Farmers Welfare, Government of India';
  }
  if (t.includes('health') || t.includes('medical') || t.includes('ayush') || c === 'health') {
    return 'Ministry of Health and Family Welfare, Government of India';
  }
  if (t.includes('housing') || t.includes('awas') || c === 'housing') {
    return 'Ministry of Housing and Urban Affairs / Ministry of Rural Development';
  }
  if (t.includes('khadi') || t.includes('msme') || t.includes('enterprise') || t.includes('craft') || t.includes('artisan')) {
    return 'Ministry of Micro, Small & Medium Enterprises (MSME)';
  }
  if (t.includes('tribal')) return 'Ministry of Tribal Affairs, Government of India';
  if (t.includes('minority')) return 'Ministry of Minority Affairs, Government of India';
  if (t.includes('women') || t.includes('child')) return 'Ministry of Women and Child Development';

  return 'Ministry of Social Justice and Empowerment, Government of India';
}

async function auditAndSanitize() {
  console.log('Connecting to MongoDB Atlas...');
  await connectDB();

  const schemes = await Scheme.find({});
  console.log(`Auditing and preparing bulk update for ${schemes.length} schemes...`);

  const bulkOps = [];

  for (const s of schemes) {
    let updateFields = {};

    // 1. Clean HTML entities in title
    const cleanTitle = decodeHtmlEntities(s.titleEn);
    if (cleanTitle !== s.titleEn) updateFields.titleEn = cleanTitle;

    // 2. Department
    if (!s.deptEn || s.deptEn === 'null' || s.deptEn === 'N/A' || s.deptEn.trim() === '') {
      updateFields.deptEn = inferDepartment(s);
    } else {
      const cleanDept = decodeHtmlEntities(s.deptEn);
      if (cleanDept !== s.deptEn) updateFields.deptEn = cleanDept;
    }

    // 3. Benefit Description
    if (s.benefitDescEn) {
      let cleanDesc = decodeHtmlEntities(s.benefitDescEn)
        .replace(/1\.\s+/g, '• ')
        .replace(/\s{2,}/g, ' ')
        .trim();
      if (cleanDesc !== s.benefitDescEn) updateFields.benefitDescEn = cleanDesc;
    }

    // 4. Benefit Amount
    if (s.benefitAmount) {
      const cleanAmt = decodeHtmlEntities(s.benefitAmount).trim();
      if (cleanAmt !== s.benefitAmount) updateFields.benefitAmount = cleanAmt;
    }

    // 5. Eligibility array fragments
    const cleanedEligibility = cleanArray(s.eligibilityEn);
    if (JSON.stringify(cleanedEligibility) !== JSON.stringify(s.eligibilityEn)) {
      updateFields.eligibilityEn = cleanedEligibility;
    }

    // 6. Documents array fragments
    const cleanedDocs = cleanArray(s.documentsEn);
    if (JSON.stringify(cleanedDocs) !== JSON.stringify(s.documentsEn)) {
      updateFields.documentsEn = cleanedDocs;
    }

    if (Object.keys(updateFields).length > 0) {
      bulkOps.push({
        updateOne: {
          filter: { _id: s._id },
          update: { $set: updateFields },
        },
      });
    }
  }

  console.log(`Total documents requiring updates: ${bulkOps.length}`);

  if (bulkOps.length > 0) {
    const result = await Scheme.bulkWrite(bulkOps);
    console.log(`Bulk update result: modifiedCount = ${result.modifiedCount}`);
  }

  console.log('Cleansing & audit completed successfully!');
  process.exit(0);
}

auditAndSanitize().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
