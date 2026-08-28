import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// GET all customer inquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST submit new inquiry (Contact Form)
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ success: true, data: inquiry, message: 'Thank you! Your inquiry has been received.' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update inquiry status (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, error: 'Inquiry not found' });
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE inquiry (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, error: 'Inquiry not found' });
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
