import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, default: 'General Inquiry' },
  location: { type: String, default: 'Colombo' },
  budgetLakhs: { type: String, default: '20-40 Lakhs' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'In Progress', 'Completed'], default: 'New' }
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
