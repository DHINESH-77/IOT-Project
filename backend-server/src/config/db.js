import dns from 'dns';
import mongoose from 'mongoose';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB Atlas] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`\n⚠️ [MongoDB Atlas] Connection Notice: ${error.message}`);
    console.warn(`🚀 Continuing with CRIVERA Standalone/Fallback mode so services remain active.\n`);
    return null;
  }
};
