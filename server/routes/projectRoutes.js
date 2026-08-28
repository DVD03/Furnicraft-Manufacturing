import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET all projects (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    if (category && category !== 'All') {
      const cleanCat = category.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.category = { $regex: new RegExp(`^${cleanCat}$`, 'i') };
    }
    if (featured === 'true') {
      query.featured = true;
    }
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create project (Admin)
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update project (Admin)
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE project (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
