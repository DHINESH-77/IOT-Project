import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function analyzeCentralDepts() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));

  const centralSchemes = await Scheme.find(
    { scope: 'Central', titleTa: { $in: ['', null] } },
    { schemeId: 1, titleEn: 1, deptEn: 1, category: 1 }
  ).lean();

  console.log(`Remaining Central Schemes: ${centralSchemes.length}`);
  const deptCounts = {};
  centralSchemes.forEach(s => {
    const d = s.deptEn || 'Government of India';
    deptCounts[d] = (deptCounts[d] || 0) + 1;
  });

  console.log('\nTop Central Ministries/Departments:');
  Object.entries(deptCounts).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([dept, count]) => {
    console.log(`- ${dept}: ${count}`);
  });

  await mongoose.disconnect();
}

analyzeCentralDepts();
