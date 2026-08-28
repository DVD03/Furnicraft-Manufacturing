import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.js';
import projectRoutes from './routes/projectRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/quotations', quotationRoutes);

// Seed API endpoint for instant database populating
app.post('/api/seed', async (req, res) => {
  try {
    const data = await seedDatabase();
    res.json({ success: true, message: `Successfully seeded ${data.length} projects!`, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Online', company: 'Furnicraft Manufacturing (Pvt) Ltd', timestamp: new Date() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` Furnicraft Backend Express Server Running`);
  console.log(` Port: http://localhost:${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/projects`);
  console.log(` Quotation API: http://localhost:${PORT}/api/quotations`);
  console.log(`=================================================`);
});
