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

async function auditDatabase() {
  console.log('========================================================');
  console.log('  CRIVERA DATABASE INTEGRITY & AUTHENTICITY AUDIT');
  console.log('========================================================\n');

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to: ${mongoose.connection.host}/${mongoose.connection.name}`);

  const allSchemes = await Scheme.find({}).lean();
  console.log(`Total Schemes retrieved: ${allSchemes.length}\n`);

  const issues = {
    missingTitle: [],
    emptyOrShortTitle: [],
    suspiciousTitle: [],
    missingDept: [],
    suspiciousDept: [],
    missingUrl: [],
    invalidUrl: [],
    nonGovUrl: [],
    emptyEligibility: [],
    emptyDocs: [],
    invalidCategory: [],
    invalidScope: [],
    duplicateIds: [],
    duplicateTitles: [],
  };

  const idMap = new Map();
  const titleMap = new Map();

  const suspiciousPatterns = [/test/i, /dummy/i, /sample/i, /fake/i, /placeholder/i, /lorem/i, /foo/i, /bar/i, /asdf/i];

  let govUrlCount = 0;
  let myschemeUrlCount = 0;
  let otherUrlCount = 0;

  const validCategories = ['agriculture', 'welfare', 'housing', 'education', 'health'];
  const validScopes = ['Central', 'Tamil Nadu', 'Central & Tamil Nadu'];

  for (const s of allSchemes) {
    // 1. ID Check
    if (!s.schemeId) {
      issues.duplicateIds.push({ id: '(none)', title: s.titleEn });
    } else {
      if (idMap.has(s.schemeId)) {
        issues.duplicateIds.push({ id: s.schemeId, title: s.titleEn });
      }
      idMap.set(s.schemeId, true);
    }

    // 2. Title Checks
    if (!s.titleEn) {
      issues.missingTitle.push(s._id);
    } else {
      if (s.titleEn.trim().length < 5) {
        issues.emptyOrShortTitle.push({ id: s.schemeId, title: s.titleEn });
      }
      for (const pat of suspiciousPatterns) {
        if (pat.test(s.titleEn)) {
          issues.suspiciousTitle.push({ id: s.schemeId, title: s.titleEn, matched: pat.toString() });
        }
      }
      const normTitle = s.titleEn.trim().toLowerCase();
      if (titleMap.has(normTitle)) {
        issues.duplicateTitles.push({ id: s.schemeId, title: s.titleEn });
      }
      titleMap.set(normTitle, true);
    }

    // 3. Dept Checks
    if (!s.deptEn || s.deptEn.trim().length < 3) {
      issues.missingDept.push({ id: s.schemeId, title: s.titleEn });
    } else {
      for (const pat of suspiciousPatterns) {
        if (pat.test(s.deptEn)) {
          issues.suspiciousDept.push({ id: s.schemeId, title: s.titleEn, dept: s.deptEn });
        }
      }
    }

    // 4. URL Checks
    if (!s.officialUrl) {
      issues.missingUrl.push({ id: s.schemeId, title: s.titleEn });
    } else {
      if (!s.officialUrl.startsWith('http')) {
        issues.invalidUrl.push({ id: s.schemeId, url: s.officialUrl });
      } else {
        const u = s.officialUrl.toLowerCase();
        if (u.includes('myscheme.gov.in')) {
          myschemeUrlCount++;
        } else if (u.includes('.gov.in') || u.includes('.nic.in') || u.includes('.tn.gov.in')) {
          govUrlCount++;
        } else {
          otherUrlCount++;
          issues.nonGovUrl.push({ id: s.schemeId, title: s.titleEn, url: s.officialUrl });
        }
      }
    }

    // 5. Eligibility Checks
    if (!s.eligibilityEn || !Array.isArray(s.eligibilityEn) || s.eligibilityEn.length === 0 || s.eligibilityEn.every(e => !e || e.trim().length < 5)) {
      issues.emptyEligibility.push({ id: s.schemeId, title: s.titleEn });
    }

    // 6. Documents Checks
    if (!s.documentsEn || !Array.isArray(s.documentsEn) || s.documentsEn.length === 0) {
      issues.emptyDocs.push({ id: s.schemeId, title: s.titleEn });
    }

    // 7. Category & Scope Checks
    if (!validCategories.includes(s.category)) {
      issues.invalidCategory.push({ id: s.schemeId, category: s.category });
    }
    if (!validScopes.includes(s.scope)) {
      issues.invalidScope.push({ id: s.schemeId, scope: s.scope });
    }
  }

  console.log('--- 1. IDENTIFIERS & TITLES ---');
  console.log(`- Duplicate Scheme IDs:      ${issues.duplicateIds.length}`);
  console.log(`- Missing Titles:            ${issues.missingTitle.length}`);
  console.log(`- Abnormally Short Titles:   ${issues.emptyOrShortTitle.length}`);
  console.log(`- Suspicious / Dummy Titles: ${issues.suspiciousTitle.length}`);
  console.log(`- Duplicate Titles:          ${issues.duplicateTitles.length}`);

  console.log('\n--- 2. DEPARTMENTS & MINISTRIES ---');
  console.log(`- Missing Departments:       ${issues.missingDept.length}`);
  console.log(`- Suspicious Departments:    ${issues.suspiciousDept.length}`);

  console.log('\n--- 3. SOURCE VERIFICATION & URLS ---');
  console.log(`- Official myScheme.gov.in URLs: ${myschemeUrlCount}`);
  console.log(`- Other Official .gov.in URLs:   ${govUrlCount}`);
  console.log(`- Non-gov URLs:                  ${otherUrlCount}`);
  console.log(`- Missing / Invalid URLs:        ${issues.missingUrl.length + issues.invalidUrl.length}`);

  console.log('\n--- 4. DATA COMPLETENESS ---');
  console.log(`- Empty Eligibility Rules:   ${issues.emptyEligibility.length}`);
  console.log(`- Empty Document Checklists: ${issues.emptyDocs.length}`);
  console.log(`- Invalid Categories:        ${issues.invalidCategory.length}`);
  console.log(`- Invalid Scopes:            ${issues.invalidScope.length}`);

  if (issues.emptyEligibility.length > 0) {
    console.log('\n⚠️ Flagged empty eligibility items:', issues.emptyEligibility);
  }
  if (issues.suspiciousTitle.length > 0) {
    console.log('\n⚠️ Flagged suspicious titles:', issues.suspiciousTitle.slice(0, 5));
  }
  if (issues.nonGovUrl.length > 0) {
    console.log('\n⚠️ Sample non-gov URLs (first 5):', issues.nonGovUrl.slice(0, 5));
  }

  // Print 10 random schemes across Central and TN to verify quality
  console.log('\n========================================================');
  console.log('  SAMPLE CHECK OF 10 RANDOM REAL SCHEMES IN DATABASE');
  console.log('========================================================');
  const sampleIndices = [0, 50, 150, 250, 350, 450, 550, 650, 750, 850].filter(i => i < allSchemes.length);
  for (const idx of sampleIndices) {
    const item = allSchemes[idx];
    console.log(`\n[#${idx + 1}] [${item.scope.toUpperCase()}] [${item.category.toUpperCase()}]`);
    console.log(`  ID:          ${item.schemeId}`);
    console.log(`  Title:       ${item.titleEn}`);
    console.log(`  Dept:        ${item.deptEn}`);
    console.log(`  Benefit:     ${item.benefitAmount}`);
    console.log(`  Official URL:${item.officialUrl}`);
    console.log(`  Eligibility (sample): ${item.eligibilityEn?.[0]?.slice(0, 100)}...`);
    console.log(`  Documents:   ${item.documentsEn?.slice(0, 4)?.join(', ')}`);
  }

  await mongoose.disconnect();
}

auditDatabase().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
