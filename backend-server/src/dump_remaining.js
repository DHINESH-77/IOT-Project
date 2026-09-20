import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function dumpRemaining() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));
  
  const remaining = await Scheme.find(
    { 
      scope: 'Tamil Nadu',
      $or: [
        { titleTa: { $exists: false } },
        { titleTa: '' },
        { titleTa: null }
      ]
    },
    { schemeId: 1, titleEn: 1, deptEn: 1, category: 1, benefitAmount: 1 }
  ).lean();
  
  fs.writeFileSync('./src/remaining_tn_schemes.json', JSON.stringify(remaining, null, 2), 'utf-8');
  console.log(`Wrote ${remaining.length} remaining schemes to src/remaining_tn_schemes.json`);
  await mongoose.disconnect();
}

dumpRemaining();
