import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function analyzeCentral() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));

  const total = await Scheme.countDocuments();
  const withTa = await Scheme.countDocuments({ titleTa: { $exists: true, $ne: '' } });
  const centralTotal = await Scheme.countDocuments({ scope: 'Central' });
  const centralWithTa = await Scheme.countDocuments({ scope: 'Central', titleTa: { $exists: true, $ne: '' } });

  console.log(`Total Schemes in DB: ${total}`);
  console.log(`Schemes with Official Tamil: ${withTa} (${Math.round((withTa/total)*100)}%)`);
  console.log(`Central Schemes: ${centralTotal} total, ${centralWithTa} with Tamil, ${centralTotal - centralWithTa} remaining.`);

  // Sample of Central schemes
  const sampleCentral = await Scheme.find({ scope: 'Central', titleTa: { $in: ['', null] } }, { schemeId: 1, titleEn: 1, deptEn: 1 }).limit(15).lean();
  console.log('\nSample Central Schemes:');
  sampleCentral.forEach((s, idx) => console.log(`${idx + 1}. [${s.schemeId}] ${s.titleEn} (${s.deptEn})`));

  await mongoose.disconnect();
}

analyzeCentral();
