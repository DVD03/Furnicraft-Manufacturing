import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

const KNOWLEDGE_BASE = [
  {
    keywords: ['40 days', '40 lakhs', 'lakhs', 'package', 'build', 'house', '1750', 'villa'],
    response: "Our signature 40 Days / 40 Lakhs package offers a complete 1750 sqft modern architectural villa constructed on a 10-perch land plot. Designed by Chartered Architects and delivered within 40 working days with a 100% Bank Guarantee!"
  },
  {
    keywords: ['bank', 'guarantee', '100%', 'money back', 'security', 'advance'],
    response: "Furnicraft provides a 100% Bank Guarantee performance bond backed by leading Sri Lankan commercial banks. Your advance payments and project investment are 100% financially secured."
  },
  {
    keywords: ['pantry', 'kitchen', 'quartz', 'cupboard', 'blum'],
    response: "We craft luxury pantry cupboards using waterproof marine ply, high-gloss acrylic finishes, Italian Blum soft-close hardware, and imported quartz stone countertops. Would you like a free pantry cost estimate?"
  },
  {
    keywords: ['wood', 'teak', 'timber', 'mahogany', 'furniture', 'dining', 'bed'],
    response: "All our solid wood furniture is handcrafted using 100% kiln-dried Ceylon Teak and Mahogany, treated with polyurethane coating and backed by a 25-year structural warranty."
  },
  {
    keywords: ['glass', 'balustrade', 'staircase', 'railing', 'tempered'],
    response: "We install 12mm ultra-clear toughened tempered glass balustrades with anodized aluminum channels and ambient LED underlighting for modern homes and hotels."
  },
  {
    keywords: ['location', 'address', 'colombo', 'kiribathgoda', 'showroom', 'contact', 'phone'],
    response: "Visit our flagship showrooms:\nColombo: 124/B Galle Road, Colombo 03\nKiribathgoda: 45/A Kandy Road, Kiribathgoda\nHotline: +94 (0) 77 123 4567 / +94 (0) 11 234 5678"
  },
  {
    keywords: ['architect', 'chartered', 'design', 'plan', '3d', 'consultation'],
    response: "Our Chartered Architects create custom 3D visualizations, structural floor plans, and interior joinery blueprints. Would you like to book a free architect consultation?"
  }
];

router.post('/', async (req, res) => {
  try {
    const { message, userDetails } = req.body;
    const lower = (message || '').toLowerCase();

    // Lead Capture Detection: If user sends phone/email or asks to book
    if (userDetails && userDetails.phone) {
      const inquiry = new Inquiry({
        name: userDetails.name || 'AI Chat Visitor',
        phone: userDetails.phone,
        email: userDetails.email || 'chat@furnicraft.lk',
        category: 'AI Chat Lead',
        message: `Message: ${message} | Capturing lead from AI Assistant`,
      });
      await inquiry.save();

      return res.json({
        success: true,
        reply: `Thank you, ${userDetails.name || 'valued client'}! Your details have been registered in our database. A Chartered Architect will call you shortly on ${userDetails.phone}.`,
        leadCaptured: true
      });
    }

    // Match Knowledge Base
    let reply = null;
    for (const kb of KNOWLEDGE_BASE) {
      if (kb.keywords.some(kw => lower.includes(kw))) {
        reply = kb.response;
        break;
      }
    }

    if (!reply) {
      reply = "Welcome to Furnicraft AI Assistant! I can help you with our 40 Days / 40 Lakhs villa builds, Ceylon Teak furniture, pantry cupboards, glass balustrades, or booking a Chartered Architect. What would you like to inquire about?";
    }

    res.json({
      success: true,
      reply,
      suggestLead: lower.includes('book') || lower.includes('cost') || lower.includes('price') || lower.includes('quote')
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
