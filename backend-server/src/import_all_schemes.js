import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Scheme } from './models/Scheme.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envCandidate = path.resolve(__dirname, '../.env');
if (fs.existsSync(envCandidate)) {
  dotenv.config({ path: envCandidate });
} else {
  dotenv.config();
}

const importAll = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('❌ MONGODB_URI is missing in .env');
      process.exit(1);
    }

    const dataPath = path.resolve(__dirname, 'myscheme_dataset.json');
    if (!fs.existsSync(dataPath)) {
      console.error(`❌ Data file not found: ${dataPath}`);
      process.exit(1);
    }

    const schemes = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`\n======================================================`);
    console.log(`  CRIVERA - Batch Ingesting ${schemes.length} Official Schemes`);
    console.log(`======================================================\n`);

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log(`Connected to: ${mongoose.connection.host}/${mongoose.connection.name}`);

    console.log('Replacing existing schemes collection with 100% official dataset...');
    await Scheme.deleteMany({});

    console.log(`Inserting ${schemes.length} verified Central & Tamil Nadu schemes...`);
    const inserted = await Scheme.insertMany(schemes, { ordered: false });

    console.log(`\n======================================================`);
    console.log(`✅ SUCCESS: Ingested ${inserted.length} official schemes into MongoDB Atlas!`);
    console.log(`   - Central Schemes:   ${schemes.filter(s => s.scope === 'Central').length}`);
    console.log(`   - Tamil Nadu Schemes:${schemes.filter(s => s.scope === 'Tamil Nadu').length}`);
    console.log(`   - Welfare:           ${schemes.filter(s => s.category === 'welfare').length}`);
    console.log(`   - Education:         ${schemes.filter(s => s.category === 'education').length}`);
    console.log(`   - Agriculture:       ${schemes.filter(s => s.category === 'agriculture').length}`);
    console.log(`   - Health:            ${schemes.filter(s => s.category === 'health').length}`);
    console.log(`   - Housing:           ${schemes.filter(s => s.category === 'housing').length}`);
    console.log(`======================================================\n`);

    await mongoose.disconnect();
    console.log('Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('Import error:', error);
    process.exit(1);
  }
};

importAll();
