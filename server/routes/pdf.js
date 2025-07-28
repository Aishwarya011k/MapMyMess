const express = require('express');
const multer = require('multer');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const router = express.Router();
const upload = multer();

// POST /api/pdf-to-text
router.post('/pdf-to-text', upload.single('pdf'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No PDF uploaded' });
  try {
    const typedarray = new Uint8Array(req.file.buffer);
    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ') + '\n';
    }
    res.json({ text });
  } catch (err) {
    res.status(500).json({ message: 'Failed to extract PDF text', error: err.message });
  }
});

module.exports = router;
