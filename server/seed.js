import mongoose from 'mongoose';
import Project from './models/Project.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://raxwotechnology_db_user:U8RdQQyqCpAyTzgd@cluster0.ih2hzvg.mongodb.net/furnicraft_db?retryWrites=true&w=majority';

export const initialProjects = [
  {
    title: 'Luxury Teak Wood Executive Dining Suite',
    category: 'Wood & Timber',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=1200',
    description: 'Handcrafted solid Ceylon Teak 8-seater dining table with natural timber grain finish and ergonomic leather upholstery.',
    material: 'Seasoned Ceylon Teak, Polyurethane Wood Coating',
    durationDays: 25,
    estimatedLakhs: 18,
    featured: true,
    themeKey: 'wood',
    badgeText: 'Solid Teak Heritage'
  },
  {
    title: 'Minimalist Tempered Glass & Aluminum Balustrade',
    category: 'Glass & Mirror',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    description: 'Frameless 12mm ultra-clear tempered glass balcony railing system with anodized aluminum channels and ambient LED under-lighting.',
    material: '12mm Toughened Glass, Anodized Steel Railing',
    durationDays: 14,
    estimatedLakhs: 12,
    featured: true,
    themeKey: 'glass',
    badgeText: 'Crystal Cyan Series'
  },
  {
    title: 'Modern Quartz Top Pantry & Breakfast Bar',
    category: 'Pantry & Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
    description: 'High-gloss acrylic pantry cabinetry equipped with soft-close Blum hardware, waterfall quartz island, and hidden pull-out storage.',
    material: 'Waterproof Marine Ply, Italian Quartz Stone, Blum Soft-Close',
    durationDays: 30,
    estimatedLakhs: 28,
    featured: true,
    themeKey: 'pantry',
    badgeText: 'Chef Choice'
  },
  {
    title: 'Bespoke Master Bedroom Suite & Walk-in Wardrobe',
    category: 'House Furniture',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
    description: 'Custom king size platform bed, integrated acoustic headboard panels, matching bedside pedestals, and sliding glass wardrobe doors.',
    material: 'Mahogany Timber, High-Density Foam, Smoked Mirror',
    durationDays: 35,
    estimatedLakhs: 32,
    featured: true,
    themeKey: 'wood',
    badgeText: 'Master Collection'
  },
  {
    title: 'Luxury Boutique Resort Hotel Villa Furniture Package',
    category: 'Hotel Furniture',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    description: 'Complete custom furniture set for 15 beach resort villas including outdoor teak loungers, rattan canopy lounge seats, and accent coffee tables.',
    material: 'Weatherproof Treated Teak, Synthetic Rattan, Marine Fabric',
    durationDays: 40,
    estimatedLakhs: 40,
    featured: true,
    themeKey: 'luxury',
    badgeText: 'Hotel Package'
  },
  {
    title: '1750 sqft Architectural Villa Construction Project',
    category: 'Construction & Architecture',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    description: 'Chartered architect designed contemporary double storey home built on 10-perch plot within 40 working days under 110% bank guarantee.',
    material: 'Structural Steel, Compressed Earth Blocks, Engineered Timber',
    durationDays: 40,
    estimatedLakhs: 40,
    featured: true,
    themeKey: 'construction',
    badgeText: '40 Days / 40 Lakhs'
  },
  {
    title: 'Heavy Duty Engineered Parquet Wood Flooring',
    category: 'Flooring Products',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    description: 'High-traffic scratch-resistant engineered oak floor planks with interlocking installation and sound-dampening acoustic underlayment.',
    material: 'European Oak Veneer, HDF Core, UV Lacquer Finish',
    durationDays: 10,
    estimatedLakhs: 15,
    featured: false,
    themeKey: 'wood',
    badgeText: 'Premium Flooring'
  },
  {
    title: 'All-Weather Teak Patio & Garden Decking Lounge',
    category: 'Outdoor Furniture',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=1200',
    description: 'UV-resistant garden lounge sofa set paired with a teak wood pergola frame and integrated solar ambient deck lighting.',
    material: 'Teak Wood, Powder Coated Steel, Olefin Fabric',
    durationDays: 20,
    estimatedLakhs: 22,
    featured: false,
    themeKey: 'outdoor',
    badgeText: 'Outdoor Living'
  },
  {
    title: 'Traditional Sculpted Wood Carvings & Decor Sculptures',
    category: 'Accessories & Art',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
    description: 'Intricately hand-sculpted wooden wall panels combining Sri Lankan traditional art motifs with contemporary luxury interior aesthetics.',
    material: 'Mara & Ebony Wood, Gold Leaf Accent Finish',
    durationDays: 12,
    estimatedLakhs: 8,
    featured: false,
    themeKey: 'wood',
    badgeText: 'Handmade Art'
  }
];

export const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed]: Connected to MongoDB Atlas...');
    await Project.deleteMany({});
    console.log('[Seed]: Cleared existing projects...');
    const inserted = await Project.insertMany(initialProjects);
    console.log(`[Seed]: Successfully seeded ${inserted.length} Furnicraft interior projects!`);
    return inserted;
  } catch (err) {
    console.error('[Seed Error]:', err.message);
    throw err;
  }
};

// Execute if run directly from CLI
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
