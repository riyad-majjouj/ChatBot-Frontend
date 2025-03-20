
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { setupDatabase } = require('./database');
const geminiRoutes = require('./routes/gemini');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up the database
setupDatabase();

// Routes
app.use('/api/gemini', geminiRoutes);

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
