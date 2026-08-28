import express from 'express';
import Quotation from '../models/Quotation.js';

const router = express.Router();

// GET all quotations (Admin)
router.get('/', async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.json({ success: true, count: quotations.length, data: quotations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST submit new quotation request (Customer)
router.post('/', async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json({ 
      success: true, 
      data: quotation, 
      message: 'Your quotation request has been generated & submitted to Furnicraft MongoDB database!' 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update quotation status (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const quotation = await Quotation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!quotation) return res.status(404).json({ success: false, error: 'Quotation not found' });
    res.json({ success: true, data: quotation });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE quotation (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    if (!quotation) return res.status(404).json({ success: false, error: 'Quotation not found' });
    res.json({ success: true, message: 'Quotation request deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
