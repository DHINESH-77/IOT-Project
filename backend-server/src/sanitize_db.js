import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Scheme } from './models/Scheme.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envCandidate = path.resolve(__dirname, '../.env');
if (fs.existsSync(envCandidate)) {
  dotenv.config({ path: envCandidate });
} else {
  dotenv.config();
}

function cleanHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function sanitizeDb() {
  console.log('Connecting to MongoDB Atlas for database sanitation...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected.');

  // 1. Fill missing eligibility for the 3 schemes
  await Scheme.updateOne(
    { schemeId: 'esdp' },
    {
      $set: {
        eligibilityEn: [
          'Youth and aspiring entrepreneurs aged 18 years and above residing in India.',
          'Special priority and fee exemption for SC, ST, Women, and Differently-abled candidates.',
          'Willingness to establish or expand a micro or small enterprise in manufacturing or service sectors.'
        ]
      }
    }
  );

  await Scheme.updateOne(
    { schemeId: 'visvasi' },
    {
      $set: {
        eligibilityEn: [
          'SC and OBC individuals or members of Self Help Groups (SHGs) who have received loans through banks or lending institutions.',
          'Maximum loan amount up to ₹2,00,000 for individual beneficiaries and ₹4,00,000 for SHG units.',
          'Account must be standard with prompt repayment to receive 5% annual interest subvention.'
        ]
      }
    }
  );

  await Scheme.updateOne(
    { schemeId: 'vpby' },
    {
      $set: {
        eligibilityEn: [
          'Senior citizens who are Indian nationals aged 60 years and completed above.',
          'Subscribers investing a lump-sum purchase price through Life Insurance Corporation of India (LIC).',
          'Family includes self, spouse, and dependants for guaranteed pension annuity.'
        ]
      }
    }
  );

  // 2. Clean HTML entities across all schemes via bulkWrite
  const all = await Scheme.find({}).lean();
  const operations = [];

  for (const s of all) {
    let changed = false;
    const updates = {};

    const newTitle = cleanHtmlEntities(s.titleEn);
    if (newTitle !== s.titleEn) { updates.titleEn = newTitle; changed = true; }

    const newDept = cleanHtmlEntities(s.deptEn);
    if (newDept !== s.deptEn) { updates.deptEn = newDept; changed = true; }

    const newBenefit = cleanHtmlEntities(s.benefitDescEn);
    if (newBenefit !== s.benefitDescEn) { updates.benefitDescEn = newBenefit; changed = true; }

    const newAmt = cleanHtmlEntities(s.benefitAmount);
    if (newAmt !== s.benefitAmount) { updates.benefitAmount = newAmt; changed = true; }

    if (Array.isArray(s.eligibilityEn)) {
      const cleanedElig = s.eligibilityEn.map(cleanHtmlEntities);
      if (JSON.stringify(cleanedElig) !== JSON.stringify(s.eligibilityEn)) {
        updates.eligibilityEn = cleanedElig;
        changed = true;
      }
    }

    if (Array.isArray(s.documentsEn)) {
      const cleanedDocs = s.documentsEn.map(cleanHtmlEntities);
      if (JSON.stringify(cleanedDocs) !== JSON.stringify(s.documentsEn)) {
        updates.documentsEn = cleanedDocs;
        changed = true;
      }
    }

    if (changed) {
      operations.push({
        updateOne: {
          filter: { _id: s._id },
          update: { $set: updates }
        }
      });
    }
  }

  if (operations.length > 0) {
    console.log(`Executing bulkWrite for ${operations.length} records...`);
    await Scheme.bulkWrite(operations);
  }

  console.log(`✅ Sanitation Complete: Updated 3 empty eligibility schemes and cleaned text on ${operations.length} records.`);
  await mongoose.disconnect();
}

sanitizeDb().catch(console.error);
