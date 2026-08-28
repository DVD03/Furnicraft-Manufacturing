import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://raxwotechnology_db_user:U8RdQQyqCpAyTzgd@cluster0.ih2hzvg.mongodb.net/furnicraft_db?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`[MongoDB Connected]: Host ${conn.connection.host} | DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Non-blocking fallback for dev environment if network is restricted
  }
};
