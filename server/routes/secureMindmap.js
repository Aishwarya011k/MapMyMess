const express = require('express');
const MindMap = require('../models/MindMap');
const auth = require('../middleware/auth');
const router = express.Router();

// Save a mind map for a user
router.post('/', auth, async (req, res) => {
  const { rawText, nodes, edges } = req.body;
  try {
    const mindmap = new MindMap({ rawText, nodes, edges, user: req.user });
    await mindmap.save();
    res.json(mindmap);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all mind maps for a user
router.get('/', auth, async (req, res) => {
  try {
    const maps = await MindMap.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(maps);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
