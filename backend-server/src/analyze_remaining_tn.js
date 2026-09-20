import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function analyzeRemaining() {
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
    { schemeId: 1, titleEn: 1, deptEn: 1 }
  ).lean();
  
  console.log(`Total remaining Tamil Nadu schemes: ${remaining.length}`);
  
  // Group by department
  const depts = {};
  remaining.forEach(s => {
    const d = s.deptEn || 'Unknown';
    depts[d] = (depts[d] || 0) + 1;
  });
  console.log('\nBreakdown by Department:');
  Object.entries(depts).sort((a, b) => b[1] - a[1]).forEach(([dept, count]) => {
    console.log(`- ${dept}: ${count} schemes`);
  });
  
  await mongoose.disconnect();
}

analyzeRemaining();
