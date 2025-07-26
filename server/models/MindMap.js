const mongoose = require('mongoose');


const MindMapSchema = new mongoose.Schema({
  rawText: String,
  nodes: Array,
  edges: Array,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MindMap', MindMapSchema);
