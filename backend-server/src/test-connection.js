import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Use public DNS to resolve Atlas SRV records on Windows if local ISP blocks SRV
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not permitted
}

// Load .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envCandidate = path.resolve(__dirname, '../.env');
if (fs.existsSync(envCandidate)) {
  dotenv.config({ path: envCandidate });
} else {
  dotenv.config();
}

const checkDatabaseConnection = async () => {
  console.log('\n========================================================');
  console.log('  CRIVERA - MongoDB Atlas Connection Verification Tool');
  console.log('========================================================\n');

  const uri = process.env.MONGODB_URI?.trim();

  // 1. Check if URI is present in .env
  if (!uri || uri === 'YOUR_MONGO_DB_URI') {
    console.error('❌ FAILED: MONGODB_URI is not configured in backend-server/.env.');
    console.error('👉 Open backend-server/.env and set MONGODB_URI="your-actual-atlas-uri"\n');
    process.exit(1);
  }

  // Mask credentials for clean terminal output
  const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
  console.log(`Connecting to: ${maskedUri}`);
  console.log('Sending handshake ping (5s timeout)...\n');

  const startTime = Date.now();

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    // Run ping command on Atlas admin
    await conn.connection.db.admin().ping();
    const duration = Date.now() - startTime;

    console.log('✅ SUCCESS: Connected to MongoDB Atlas successfully!');
    console.log(`- Database Name: ${conn.connection.name}`);
    console.log(`- Host:          ${conn.connection.host}`);
    console.log(`- Response Time: ${duration} ms`);

    // List collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`- Collections:   ${collections.length > 0 ? collections.map((c) => c.name).join(', ') : '0 (Empty database - ready for seeding)'}`);

    console.log('\n🎉 Connection test passed! Your backend is ready to sync.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ CONNECTION FAILED:');
    console.error(error.message);

    console.log('\nCommon Fixes:');
    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.log('1. Password Error: Verify the username and password in your connection string.');
    } else if (error.message.includes('whitelist') || error.message.includes('buffering timed out') || error.message.includes('timed out')) {
      console.log('1. IP Whitelist: Go to Atlas -> Network Access -> Add IP Address -> Select "Allow Access from Anywhere" (0.0.0.0/0).');
    } else {
      console.log('1. Verify your network connection and the Atlas cluster status.');
    }
    console.log('');
    process.exit(1);
  }
};

checkDatabaseConnection();
