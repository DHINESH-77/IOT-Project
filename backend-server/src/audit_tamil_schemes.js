import dns from 'dns';
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch(e){}
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { connectDB } from './config/db.js';
import { Scheme } from './models/Scheme.js';

async function auditTamil() {
  await connectDB();
  const all = await Scheme.find({}).lean();
  console.log(`=== AUDIT REPORT: ALL SCHEMES IN DATABASE ===`);
  console.log(`Total Schemes: ${all.length}`);

  let missingTitleTa = 0;
  let missingDeptTa = 0;
  let missingDescTa = 0;
  let missingEligTa = 0;
  let missingDocsTa = 0;

  let tnCount = 0;
  let centralCount = 0;

  for (const s of all) {
    if (s.scope === 'Tamil Nadu') tnCount++;
    else centralCount++;

    if (!s.titleTa || !s.titleTa.trim()) missingTitleTa++;
    if (!s.deptTa || !s.deptTa.trim()) missingDeptTa++;
    if (!s.benefitDescTa || !s.benefitDescTa.trim()) missingDescTa++;
    if (!s.eligibilityTa || s.eligibilityTa.length === 0) missingEligTa++;
    if (!s.documentsTa || s.documentsTa.length === 0) missingDocsTa++;
  }

  console.log(`Tamil Nadu State Schemes: ${tnCount}`);
  console.log(`Central Government Schemes: ${centralCount}`);
  console.log(`Missing Tamil Title (titleTa): ${missingTitleTa}`);
  console.log(`Missing Tamil Department (deptTa): ${missingDeptTa}`);
  console.log(`Missing Tamil Benefit Description (benefitDescTa): ${missingDescTa}`);
  console.log(`Missing Tamil Eligibility (eligibilityTa): ${missingEligTa}`);
  console.log(`Missing Tamil Documents (documentsTa): ${missingDocsTa}`);

  console.log('\n--- SAMPLE 5 TAMIL NADU SCHEMES (OFFICIAL TAMIL) ---');
  all.filter(s => s.scope === 'Tamil Nadu').slice(0, 5).forEach(s => {
    console.log(`ID: ${s.schemeId}`);
    console.log(`EN: ${s.titleEn}`);
    console.log(`TA: ${s.titleTa}`);
    console.log(`Dept (TA): ${s.deptTa}`);
    console.log(`Elig (TA): ${s.eligibilityTa?.slice(0, 2).join(' | ')}`);
    console.log(`Docs (TA): ${s.documentsTa?.slice(0, 2).join(' | ')}`);
    console.log('---');
  });

  console.log('\n--- SAMPLE 5 CENTRAL SCHEMES (OFFICIAL TAMIL) ---');
  all.filter(s => s.scope === 'Central').slice(0, 5).forEach(s => {
    console.log(`ID: ${s.schemeId}`);
    console.log(`EN: ${s.titleEn}`);
    console.log(`TA: ${s.titleTa}`);
    console.log(`Dept (TA): ${s.deptTa}`);
    console.log(`Elig (TA): ${s.eligibilityTa?.slice(0, 2).join(' | ')}`);
    console.log(`Docs (TA): ${s.documentsTa?.slice(0, 2).join(' | ')}`);
    console.log('---');
  });

  process.exit(0);
}

auditTamil().catch(e => { console.error(e); process.exit(1); });
