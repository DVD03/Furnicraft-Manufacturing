import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'Wood & Timber', 
      'Glass & Mirror', 
      'Pantry & Kitchen', 
      'House Furniture', 
      'Hotel Furniture', 
      'Construction & Architecture', 
      'Flooring Products', 
      'Outdoor Furniture', 
      'Accessories & Art'
    ]
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  material: { type: String, default: 'Teak Wood, Tempered Glass, Stainless Steel' },
  durationDays: { type: Number, default: 40 },
  estimatedLakhs: { type: Number, default: 40 },
  featured: { type: Boolean, default: false },
  themeKey: { 
    type: String, 
    default: 'wood',
    enum: ['wood', 'glass', 'pantry', 'modern', 'construction', 'outdoor', 'luxury']
  },
  badgeText: { type: String, default: 'Custom Crafted' },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
