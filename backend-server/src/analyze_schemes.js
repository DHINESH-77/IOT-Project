import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function analyzeDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));
  
  const total = await Scheme.countDocuments();
  const withTamilTitle = await Scheme.countDocuments({ titleTa: { $exists: true, $ne: '' } });
  const tnCount = await Scheme.countDocuments({ scope: 'Tamil Nadu' });
  const centralCount = await Scheme.countDocuments({ scope: 'Central' });
  
  console.log('=== DB SCHEME ANALYSIS ===');
  console.log('Total Schemes in DB:', total);
  console.log('Schemes with titleTa already present:', withTamilTitle);
  console.log('Tamil Nadu State Schemes:', tnCount);
  console.log('Central Schemes:', centralCount);
  
  // Show all schemes that already have titleTa
  const alreadyTamil = await Scheme.find({ titleTa: { $exists: true, $ne: '' } }, { schemeId: 1, titleEn: 1, titleTa: 1 }).lean();
  console.log('\nExisting Tamil Schemes:');
  alreadyTamil.forEach(s => console.log(`- [${s.schemeId}] ${s.titleEn} -> ${s.titleTa}`));
  
  await mongoose.disconnect();
}

analyzeDb();
