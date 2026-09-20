import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function inspectExistingTamil() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));
  
  const schemes = await Scheme.find({ titleTa: { $exists: true, $ne: '' } }).lean();
  console.log(`Found ${schemes.length} schemes with Tamil content.\n`);
  
  schemes.forEach((s, idx) => {
    console.log(`========================================`);
    console.log(`${idx + 1}. [${s.schemeId}] ${s.titleEn}`);
    console.log(`   தலைப்பு (titleTa): ${s.titleTa}`);
    console.log(`   துறை (deptTa): ${s.deptTa}`);
    console.log(`   பயனாளி குழு (targetGroupTa): ${s.targetGroupTa}`);
    console.log(`   பயன் விவரம் (benefitDescTa): ${s.benefitDescTa}`);
    console.log(`   தகுதி (eligibilityTa):`);
    (s.eligibilityTa || []).forEach(e => console.log(`     - ${e}`));
    console.log(`   தேவையான ஆவணங்கள் (documentsTa):`);
    (s.documentsTa || []).forEach(d => console.log(`     - ${d}`));
    console.log(``);
  });
  
  await mongoose.disconnect();
}

inspectExistingTamil();
