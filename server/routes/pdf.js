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
    let headings = [];
    let fontSizes = [];
    let allItems = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      // Collect all items with their font size
      content.items.forEach(item => {
        // item.transform[0] is font size (scaleX)
        allItems.push({ str: item.str, fontSize: item.transform[0] });
        fontSizes.push(item.transform[0]);
      });
    }
    // Find unique font sizes, sort descending
    const uniqueFontSizes = [...new Set(fontSizes)].sort((a, b) => b - a);
    // Use top 2 font sizes as headings/subheadings
    const headingFontSizes = uniqueFontSizes.slice(0, 2);
    headings = allItems
      .filter(item => headingFontSizes.includes(item.fontSize) && item.str.trim().length > 0)
      .map(item => item.str.trim());
    res.json({ text: headings.join('\n') });
  } catch (err) {
    res.status(500).json({ message: 'Failed to extract PDF headings', error: err.message });
  }
});

module.exports = router;
