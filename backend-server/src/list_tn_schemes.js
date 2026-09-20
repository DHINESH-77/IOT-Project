import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function listTnSchemes() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));
  
  const tnSchemes = await Scheme.find({ scope: 'Tamil Nadu' }, { schemeId: 1, titleEn: 1, deptEn: 1, officialUrl: 1 }).limit(30).lean();
  console.log('=== SAMPLE 30 TAMIL NADU SCHEMES IN DB ===');
  tnSchemes.forEach((s, idx) => {
    console.log(`${idx + 1}. [${s.schemeId}] ${s.titleEn} (${s.deptEn})`);
  });
  
  await mongoose.disconnect();
}

listTnSchemes();
