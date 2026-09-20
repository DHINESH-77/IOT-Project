import dns from 'dns';
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch(e){}
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { connectDB } from './config/db.js';
import { Scheme } from './models/Scheme.js';

async function verifyAll() {
  await connectDB();
  const all = await Scheme.find({});
  let issues = 0;

  for (const s of all) {
    const text = [s.titleEn, s.deptEn, s.benefitAmount, s.benefitDescEn, ...(s.eligibilityEn || []), ...(s.documentsEn || [])].join(' ');
    if (/&(amp|quot|#39|lt|gt|nbsp);/.test(text)) {
      issues++;
    }
    if (!s.benefitDescEn || s.benefitDescEn.length < 15) {
      console.log('Short desc:', s.schemeId);
      issues++;
    }
    if (!s.benefitAmount || s.benefitAmount.length === 0) {
      console.log('No amt:', s.schemeId);
      issues++;
    }
    if (!s.eligibilityEn || s.eligibilityEn.length === 0) {
      console.log('No elig:', s.schemeId);
      issues++;
    }
    if (!s.documentsEn || s.documentsEn.length === 0) {
      console.log('No docs:', s.schemeId);
      issues++;
    }
  }

  console.log(`Audited ${all.length} schemes. Total issues remaining: ${issues}`);
  process.exit(0);
}

verifyAll().catch(e => { console.error(e); process.exit(1); });
