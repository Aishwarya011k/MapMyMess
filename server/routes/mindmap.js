const express = require('express');
const MindMap = require('../models/MindMap');
const extractTopics = require('../nlp/extractTopics');
const router = express.Router();

// Create mind map from text
router.post('/', async (req, res) => {
  const { rawText } = req.body;
  const { nodes, edges } = extractTopics(rawText);
  const mindmap = new MindMap({ rawText, nodes, edges });
  await mindmap.save();
  res.json(mindmap);
});

// Get all mind maps
router.get('/', async (req, res) => {
  const maps = await MindMap.find().sort({ createdAt: -1 });
  res.json(maps);
});

module.exports = router;
