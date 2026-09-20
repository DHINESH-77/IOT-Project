import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function getBatch2() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));
  
  const pendingTn = await Scheme.find(
    { 
      scope: 'Tamil Nadu',
      $or: [
        { titleTa: { $exists: false } },
        { titleTa: '' },
        { titleTa: null }
      ]
    },
    { schemeId: 1, titleEn: 1, deptEn: 1, benefitAmount: 1, officialUrl: 1 }
  ).limit(20).lean();
  
  console.log(`Found ${pendingTn.length} pending Tamil Nadu schemes for Batch 2:`);
  console.log(JSON.stringify(pendingTn, null, 2));
  
  await mongoose.disconnect();
}

getBatch2();
