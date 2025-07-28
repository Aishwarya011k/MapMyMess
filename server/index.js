require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');



const mindmapRoutes = require('./routes/mindmap');
const authRoutes = require('./routes/auth');
const secureMindmapRoutes = require('./routes/secureMindmap');
const pdfRoutes = require('./routes/pdf');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));



app.use('/api/auth', authRoutes);
app.use('/api/secure-mindmaps', secureMindmapRoutes);
app.use('/api/mindmaps', mindmapRoutes);
app.use('/api', pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
