import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  category: { type: String, required: true },
  basePriceLakhs: { type: Number, default: 0 },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  location: { type: String, default: 'Colombo' },
  areaSqft: { type: Number, default: 1000 },
  woodPreference: { type: String, default: 'Ceylon Teak' },
  notes: { type: String },
  calculatedEstimateLakhs: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Quotation Sent', 'Approved', 'Declined'], 
    default: 'Pending' 
  }
}, { timestamps: true });

export default mongoose.model('Quotation', quotationSchema);
